import { Injectable } from '@nestjs/common';
import { PaginationData } from '../../common/types/pagination.type';
import { TradeRestClient } from '../clients/trade.rest';
import { Currency } from '../types/currency';
import { Order } from '../types/order.type';

@Injectable()
export class TradeService {
  constructor(private readonly tradeClient: TradeRestClient) {}

  async getCurrencies(): Promise<Currency[]> {
    return this.tradeClient.getCurrencies();
  }

  async getTickers(): Promise<string[]> {
    return this.tradeClient.getTickers();
  }

  async getOrders(
    clientCode: string,
    paginationData: PaginationData,
  ): Promise<Order[]> {
    return this.tradeClient.getOrders(clientCode, paginationData);
  }

  async getOrder(clientCode: string, orderCode: string): Promise<Order> {
    return this.tradeClient.getOrder(clientCode, orderCode);
  }

  async cancelOrder(clientCode: string, orderCode: string): Promise<Order> {
    return this.tradeClient.cancelOrder(clientCode, orderCode);
  }

  async trade(clientCode: string, data: any): Promise<Order> {
    const payload = {
      clientCode,
      ...data,
    };

    return this.tradeClient.trade(payload);
  }
}
