import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Client } from 'src/client/types/client.type';
import { SuccessResponse } from 'src/common/types/rest-response.type';
import { sendResponse } from 'src/common/utils/helper.util';
import { TradeService } from '../services/trade.service';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  async trade(
    @Body() body: any,
    @Auth() client: Client,
  ): Promise<SuccessResponse> {
    const order = await this.tradeService.trade(client.code, body);

    return sendResponse('Order placed successfully', order);
  }
}
