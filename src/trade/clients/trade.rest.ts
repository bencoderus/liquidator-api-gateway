import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestClient, RestParser, RestRequest } from '@liquidator/common';
import { Currency } from '../types/currency';
import { Order } from '../types/order.type';
import { PaginationData } from '../../common/types/pagination.type';

@Injectable()
export class TradeRestClient extends RestClient {
  private baseUrl: string;
  private readonly logger: Logger = new Logger();

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.tradeService.baseUrl');
  }

  private getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  public async getCurrencies(): Promise<Currency[]> {
    const requestData: RestRequest = {
      url: this.getUrl('/currencies'),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  public async getTickers(): Promise<string[]> {
    const requestData: RestRequest = {
      url: this.getUrl('/tickers'),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  public async getOrders(
    clientCode: string,
    paginationData: PaginationData,
  ): Promise<Order[]> {
    const url = `/clients/${clientCode}/orders`;

    const requestData: RestRequest = {
      url: this.getUrl(url),
      method: 'GET',
      data: {
        page: paginationData.pageNumber,
        limit: paginationData.perPage,
      },
    };

    const response = await this.send(requestData);
    const responseData = response.getData();

    return responseData;
  }

  public async getOrder(clientCode: string, orderCode: string): Promise<Order> {
    const url = `/clients/${clientCode}/orders/${orderCode}`;

    const requestData: RestRequest = {
      url: this.getUrl(url),
      method: 'GET',
    };

    const response = await this.send(requestData);
    const responseData = response.getData();

    if (response.getStatusCode() === 404) {
      throw new NotFoundException(responseData.message);
    }

    return responseData;
  }

  public async cancelOrder(
    clientCode: string,
    orderCode: string,
  ): Promise<Order> {
    const url = `/clients/${clientCode}/orders/${orderCode}/cancel`;

    const requestData: RestRequest = {
      url: this.getUrl(url),
      method: 'POST',
    };

    const response = await this.send(requestData);
    const responseData = response.getData();

    if ([404, 400].includes(response.getStatusCode())) {
      throw new NotFoundException(responseData.message);
    }

    return responseData;
  }

  public async trade(data: any): Promise<Order> {
    const requestData: RestRequest = {
      url: this.getUrl('/trade'),
      method: 'POST',
      data,
    };

    const response = await this.send(requestData);
    const responseData = response.getData();

    if (response.validationError()) {
      const errors = responseData.errors;
      throw new UnprocessableEntityException(errors);
    }

    if (response.clientError()) {
      const message = responseData.message;
      throw new BadRequestException(message);
    }

    return responseData;
  }

  private async send(requestData: RestRequest): Promise<RestParser> {
    const response = await this.sendRequest(requestData);

    if (response.connectionFailed() || response.serverError()) {
      this.logger.error(response.getException());
      throw new HttpException('Unable to connect to trade service', 503);
    }

    return response;
  }
}
