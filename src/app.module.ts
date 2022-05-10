import { Module } from '@nestjs/common';
import { CommonModule } from './common/modules/common.module';
import { RateModule } from './rate/modules/rate.module';
import { ClientModule } from './client/modules/client.module';
import { OrderModule } from './order/modules/order.module';

@Module({
  imports: [CommonModule, RateModule, ClientModule, OrderModule],
  providers: [],
})
export class AppModule {}
