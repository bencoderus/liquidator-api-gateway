import { Controller, Get } from '@nestjs/common';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { TradeService } from '../services/trade.service';

@Controller()
export class CurrencyController {
  constructor(private readonly tradeService: TradeService) {}

  @Get('currencies')
  async getCurrencies(): Promise<SuccessResponse> {
    const currencies = await this.tradeService.getCurrencies();

    return sendResponse('Currencies retrieved successfully', currencies);
  }

  @Get('tickers')
  async getTickers(): Promise<SuccessResponse> {
    const tickers = await this.tradeService.getTickers();

    return sendResponse('Tickers retrieved successfully', tickers);
  }
}
