import { Injectable } from '@nestjs/common';
import { RateClient } from '../clients/rate.client';
import { IRate } from '../interfaces/rate.interface';

@Injectable()
export class RateService {
  constructor(private rateClient: RateClient) {}

  async getRates(): Promise<IRate[]> {
    return await this.rateClient.getRates();
  }

  async getRate(currency: string): Promise<IRate> {
    return await this.rateClient.getRate(currency);
  }
}
