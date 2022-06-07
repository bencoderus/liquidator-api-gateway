import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyTokenMiddleware } from 'src/auth/middlewares/verify-token.middleware';
import { RateRestClient } from '../clients/rate.rest';
import { RateController } from '../controllers/rate.controller';
import { RateService } from '../services/rate.service';
import { AuthModule } from 'src/auth/modules/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RateController],
  providers: [RateService, RateRestClient],
})
export class RateModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(RateController);
  }
}
