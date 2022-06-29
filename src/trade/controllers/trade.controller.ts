import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Client } from '../../client/types/client.type';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
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
