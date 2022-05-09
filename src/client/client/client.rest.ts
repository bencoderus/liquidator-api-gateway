import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestException } from 'src/common/exceptions/rest.exception';
import { IHttpRequest } from 'src/common/interfaces/http-request.interface';
import { RestService } from 'src/common/services/rest.service';
import { IClient } from '../interfaces/client.interface';

@Injectable()
export class ClientRestClient extends RestService {
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.clientService.baseUrl');
  }

  getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  async getClientByApiKey(apiKey: string): Promise<IClient> {
    const requestData: IHttpRequest = {
      url: this.getUrl('/clients/credentials/validate/api-key'),
      method: 'POST',
      data: {
        apiKey,
      },
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
    const response = error.response;
    const message: string = response.message;

    if (message.toLowerCase().includes('client not found')) {
      throw new UnauthorizedException('API key is not valid.');
    }
    throw new HttpException(message, statusCode);
  }
}
