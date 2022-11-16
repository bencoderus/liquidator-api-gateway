import { Injectable } from '@nestjs/common';
import { Client } from '../../client/types/client.type';
import { NotificationRestClient } from '../clients/notification.rest';

@Injectable()
export class OtpService {
  constructor(private client: NotificationRestClient) {}

  public async sendOtp(client: Client, purpose: string) {
    const response = await this.client.sendOtp({
      clientCode: client.code,
      clientEmail: client.email,
      purpose,
    });

    return response;
  }
}
