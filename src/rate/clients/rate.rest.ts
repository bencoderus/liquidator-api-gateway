import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRate } from '../interfaces/rate.interface';
import { RestClient, RestRequest, RestParser } from '@liquidator/common';

@Injectable()
export class RateRestClient extends RestClient {
  private baseUrl: string;
  private readonly logger: Logger = new Logger();

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.rateService.baseUrl');
  }

  getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  async getRates(): Promise<IRate[]> {
    const requestData: RestRequest = {
      url: this.getUrl('/rates'),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  async getRate(currency: string): Promise<IRate> {
    const requestData: RestRequest = {
      url: this.getUrl('/rates/' + currency),
      method: 'GET',
    };

    const response = await this.send(requestData);

    if (response.getStatusCode() === 404) {
      throw new HttpException('Currency is not supported', 404);
    }

    return response.getData();
  }

  async send(requestData: RestRequest): Promise<RestParser> {
    const response = await this.sendRequest(requestData);

    if (response.connectionFailed() || response.serverError()) {
      this.logger.error(response.getException());
      throw new HttpException('Unable to connect to rate service', 503);
    }

    return response;
  }
}
