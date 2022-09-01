import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyTokenMiddleware } from '../../auth/middlewares/verify-token.middleware';
import { AuthModule } from '../../auth/modules/auth.module';
import { WalletRestClient } from '../clients/wallet.rest';
import { WalletController } from '../controllers/wallet.controller';
import { WalletService } from '../services/wallet.service';

@Module({
  imports: [AuthModule],
  controllers: [WalletController],
  providers: [WalletRestClient, WalletService],
})
export class WalletModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(WalletController);
  }
}
