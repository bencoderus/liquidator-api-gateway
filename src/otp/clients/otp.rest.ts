import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestClient, RestRequest, RestParser } from '@liquidator/common';
import { SendOtpRequest, SendOtpResponse } from '../types/otp.type';

@Injectable()
export class OtpRestClient extends RestClient {
  private readonly baseUrl: string;
  private readonly logger: Logger = new Logger();

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.clientService.baseUrl');
  }

  private getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    const requestData: RestRequest = {
      url: this.getUrl('/otp/send'),
      method: 'POST',
      data,
    };

    const response = await this.send(requestData);
    const responseData = response.getData();

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
      throw new HttpException('Unable to process request service.', 503);
    }

    return response;
  }
}
