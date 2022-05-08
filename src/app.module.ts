import { Module } from '@nestjs/common';
import { CommonModule } from './common/modules/common.module';
import { RateModule } from './rate/modules/rate.module';

@Module({
  imports: [CommonModule, RateModule],
})
export class AppModule {}
