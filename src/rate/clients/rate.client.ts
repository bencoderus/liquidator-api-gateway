import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IHttpRequest } from 'src/common/interfaces/http-request.interface';
import { IRate } from '../interfaces/rate.interface';
import { BaseClient } from 'src/common/clients/base.client';
import { RestException } from 'src/common/exceptions/rest.exception';

@Injectable()
export class RateClient extends BaseClient {
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.rateService.baseUrl');
  }

  getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  async getRates(): Promise<IRate[]> {
    const requestData: IHttpRequest = {
      url: this.getUrl('/rates'),
      method: 'GET',
    };

    return await this.sendRequest(requestData);
  }

  async getRate(currency: string): Promise<IRate> {
    const requestData: IHttpRequest = {
      url: this.getUrl('/rates/' + currency),
      method: 'GET',
    };

    return await this.send(requestData);
  }

  async send(requestData: IHttpRequest): Promise<any> {
    try {
      return await this.sendRequest(requestData);
    } catch (error: any) {
      if (error instanceof RestException && error.hasResponse) {
        this.handleException(error);
      }
      throw new HttpException('Unable to connect to rate service', 503);
    }
  }

  handleException(error: RestException) {
    const statusCode = error.responseStatusCode;
    const message = error.response;

    throw new HttpException(message, statusCode);
  }
}
