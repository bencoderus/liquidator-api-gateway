import { Injectable } from '@nestjs/common';
import { RateRestClient } from '../clients/rate.rest';
import { IRate } from '../interfaces/rate.interface';

@Injectable()
export class RateService {
  constructor(private rateClient: RateRestClient) {}

  async getRates(): Promise<IRate[]> {
    return await this.rateClient.getRates();
  }

  async getRate(currency: string): Promise<IRate> {
    return await this.rateClient.getRate(currency);
  }
}
