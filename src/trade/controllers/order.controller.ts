import { Controller, Get, Param } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Client } from 'src/client/types/client.type';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationData } from 'src/common/types/pagination.type';
import { SuccessResponse } from 'src/common/types/rest-response.type';
import { sendResponse } from 'src/common/utils/helper.util';
import { TradeService } from '../services/trade.service';

@Controller('market-orders')
export class OrderController {
  constructor(private readonly tradeService: TradeService) {}

  @Get('/')
  public async getOrders(
    @Auth() client: Client,
    @Pagination() paginationData: PaginationData,
  ): Promise<SuccessResponse> {
    const orders = await this.tradeService.getOrders(
      client.code,
      paginationData,
    );

    return sendResponse('Orders retrieved successfully', orders);
  }

  @Get('/:code')
  public async getOrder(
    @Auth() client: Client,
    @Param('code') code: string,
  ): Promise<SuccessResponse> {
    const order = await this.tradeService.getOrder(client.code, code);

    return sendResponse('Order retrieved successfully', order);
  }
}
