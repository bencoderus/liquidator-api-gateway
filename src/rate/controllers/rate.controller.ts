import { Controller, Get, Param } from '@nestjs/common';
import { RateService } from '../services/rate.service';

@Controller('rates')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  async getRates() {
    return await this.rateService.getRates();
  }

  @Get(':currency')
  async getRate(@Param('currency') currency: string) {
    return await this.rateService.getRate(currency);
  }
}
