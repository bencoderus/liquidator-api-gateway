import { Injectable } from '@nestjs/common';
import { OtpRestClient } from '../clients/otp.rest';

@Injectable()
export class OtpService {
  constructor(private client: OtpRestClient) {}

  public async sendOtp(clientCode: string, purpose: string) {
    return this.client.sendOtp({
      clientCode: clientCode,
      purpose,
    });
  }
}
