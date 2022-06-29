import { Controller, Get, Param } from '@nestjs/common';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { RateService } from '../services/rate.service';

@Controller('rates')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  async getRates(): Promise<SuccessResponse> {
    const rates = await this.rateService.getRates();

    return sendResponse('Rates retrieved successfully.', rates);
  }

  @Get(':currency')
  async getRate(@Param('currency') currency: string): Promise<SuccessResponse> {
    const rate = await this.rateService.getRate(currency);

    return sendResponse('Rate retrieved successfully.', rate);
  }
}
