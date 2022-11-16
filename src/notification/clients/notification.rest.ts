import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestClient, RestRequest, RestParser } from '@liquidator/common';
import { SendOtpRequest, SendOtpResponse } from '../types/otp.type';

@Injectable()
export class NotificationRestClient extends RestClient {
  private baseUrl: string;
  private readonly logger: Logger = new Logger();

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get(
      'services.notificationService.baseUrl',
    );
  }

  getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    const requestData: RestRequest = {
      url: this.getUrl('/otp/send'),
      method: 'POST',
      data,
    };

    const response = await this.send(requestData);

    const statusCode = response.getStatusCode();
    const message = response.getData().message;

    if (statusCode !== 200) {
      throw new HttpException(message, statusCode);
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
