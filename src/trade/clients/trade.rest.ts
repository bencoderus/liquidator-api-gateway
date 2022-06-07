import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IHttpRequest } from 'src/common/interfaces/http-request.interface';
import { RestService } from 'src/common/services/rest.service';
import { Currency } from '../types/currency';

@Injectable()
export class TradeRestClient extends RestService {
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.tradeService.baseUrl');
  }

  private getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  public async getCurrencies(): Promise<Currency[]> {
    const requestData: IHttpRequest = {
      url: this.getUrl('/currencies'),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  public async getTickers(): Promise<string[]> {
    const requestData: IHttpRequest = {
      url: this.getUrl('/tickers'),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  private async send(requestData: IHttpRequest): Promise<any> {
    const response = await this.sendRequest(requestData);

    if (response.connectionFailed() || response.serverError()) {
      console.log(response.getException());
      throw new HttpException('Unable to connect to trade service', 503);
    }

    return response;
  }
}
