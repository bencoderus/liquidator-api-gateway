import { Injectable } from '@nestjs/common';
import { RateRestClient } from '../clients/rate.rest';
import { IRate } from '../interfaces/rate.interface';

@Injectable()
export class RateService {
  constructor(private rateClient: RateRestClient) {}

  /**
   * Get rates from rate service.
   *
   * @returns {Promise<IRate>}
   */
  async getRates(): Promise<IRate[]> {
    return await this.rateClient.getRates();
  }

  /**
   * Get rate using currency from rate service.
   *
   * @param {string} currency
   *
   * @returns {Promise<IRate>}
   */
  async getRate(currency: string): Promise<IRate> {
    return await this.rateClient.getRate(currency);
  }
}
