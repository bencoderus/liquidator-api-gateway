import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyTokenMiddleware } from '../../auth/middlewares/verify-token.middleware';
import { TradeRestClient } from '../clients/trade.rest';
import { CurrencyController } from '../controllers/currency.controller';
import { TradeService } from '../services/trade.service';
import { AuthModule } from '../../auth/modules/auth.module';
import { TradeController } from '../controllers/trade.controller';
import { OrderController } from '../controllers/order.controller';

@Module({
  imports: [AuthModule],
  controllers: [CurrencyController, TradeController, OrderController],
  providers: [TradeRestClient, TradeService],
})
export class TradeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(CurrencyController);
    consumer.apply(VerifyTokenMiddleware).forRoutes(OrderController);
    consumer.apply(VerifyTokenMiddleware).forRoutes(TradeController);
  }
}
