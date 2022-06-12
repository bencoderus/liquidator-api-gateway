import { RestClient, RestParser, RestRequest } from '@liquidator/common';
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientVerification } from '../types/verification.type';

@Injectable()
export class ClientRestClient extends RestClient {
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.clientService.baseUrl');
  }

  getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  async getProfile(code: string) {
    const requestData: RestRequest = {
      url: this.getUrl(`/clients/${code}/profile`),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  async getCredentials(code: string) {
    const requestData: RestRequest = {
      url: this.getUrl(`/clients/${code}/credentials`),
      method: 'GET',
    };

    const response = await this.send(requestData);

    return response.getData();
  }

  async updateWebhookUrl(
    code: string,
    payload: Record<string, any>,
  ): Promise<ClientVerification> {
    const requestData: RestRequest = {
      url: this.getUrl(`/clients/${code}/webhooks`),
      method: 'POST',
      data: payload,
    };

    const response = await this.send(requestData);

    const responseData = response.getData();
    const message = response.responseExists() ? responseData.message : '';

    if (response.getStatusCode() === 422) {
      const errors = responseData.errors;
      throw new UnprocessableEntityException(errors);
    }

    if (response.clientError()) {
      throw new BadRequestException(message);
    }

    return response.getData();
  }

  async getClientByApiKey(apiKey: string): Promise<ClientVerification> {
    const requestData: RestRequest = {
      url: this.getUrl('/authorize'),
      method: 'POST',
      data: {
        apiKey,
      },
    };

    const response = await this.send(requestData);

    const responseData = response.getData();
    const message = response.clientError() ? responseData.message : '';

    if (message.toLowerCase().includes('client not found')) {
      throw new UnauthorizedException('API key is not valid.');
    }

    return response.getData();
  }

  async send(requestData: RestRequest): Promise<RestParser> {
    const response = await this.sendRequest(requestData);

    if (response.connectionFailed() || response.serverError()) {
      throw new HttpException('Unable to connect to client service', 503);
    }

    return response;
  }
}
