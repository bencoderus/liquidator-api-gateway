import { Module } from '@nestjs/common';
import { CommonModule } from './common/modules/common.module';
import { RateModule } from './rate/modules/rate.module';
import { ClientModule } from './client/modules/client.module';
import { TradeModule } from './trade/modules/trade.module';
import { WalletModule } from './wallet/modules/wallet.module';
import { NotificationModule } from './notification/modules/notification.module';

@Module({
  imports: [
    CommonModule,
    RateModule,
    ClientModule,
    TradeModule,
    WalletModule,
    NotificationModule,
  ],
})
export class AppModule {}
