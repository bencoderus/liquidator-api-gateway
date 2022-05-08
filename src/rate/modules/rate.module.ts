import { Module } from '@nestjs/common';
import { RateClient } from '../clients/rate.client';
import { RateController } from '../controllers/rate.controller';
import { RateService } from '../services/rate.service';

@Module({
  controllers: [RateController],
  providers: [RateService, RateClient],
})
export class RateModule {}
