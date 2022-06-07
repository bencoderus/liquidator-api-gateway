import { Injectable } from '@nestjs/common';
import { TradeRestClient } from '../clients/trade.rest';
import { Currency } from '../types/currency';

@Injectable()
export class TradeService {
  constructor(private readonly tradeClient: TradeRestClient) {}

  async getCurrencies(): Promise<Currency[]> {
    return this.tradeClient.getCurrencies();
  }

  async getTickers(): Promise<string[]> {
    return this.tradeClient.getTickers();
  }
}
