import { Module } from '@nestjs/common';
import { CommonModule } from './common/modules/common.module';
import { RateModule } from './rate/modules/rate.module';
import { ClientModule } from './client/modules/client.module';
import { OrderModule } from './order/modules/order.module';
import { TradeModule } from './trade/modules/trade.module';

@Module({
  imports: [CommonModule, RateModule, ClientModule, OrderModule, TradeModule],
  providers: [],
})
export class AppModule {}
