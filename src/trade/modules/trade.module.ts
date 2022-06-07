import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyTokenMiddleware } from 'src/auth/middlewares/verify-token.middleware';
import { TradeRestClient } from '../clients/trade.rest';
import { CurrencyController } from '../controllers/currency.controller';
import { TradeService } from '../services/trade.service';
import { AuthModule } from 'src/auth/modules/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CurrencyController],
  providers: [TradeRestClient, TradeService],
})
export class TradeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(CurrencyController);
  }
}
