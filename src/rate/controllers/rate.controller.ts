import { Controller, Get, Param } from '@nestjs/common';
import { RateService } from '../services/rate.service';

@Controller('rates')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  async getRates() {
    const rate = await this.rateService.getRates();

    return {
      message: 'Rates retrieved successfully.',
      data: rate,
    };
  }

  @Get(':currency')
  async getRate(@Param('currency') currency: string) {
    const rate = await this.rateService.getRate(currency);

    return {
      message: 'Rate retrieved successfully.',
      data: rate,
    };
  }
}
