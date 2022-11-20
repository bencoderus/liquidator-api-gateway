import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyTokenMiddleware } from '../../auth/middlewares/verify-token.middleware';
import { AuthModule } from '../../auth/modules/auth.module';
import { OtpRestClient } from '../clients/otp.rest';
import { OtpController } from '../controllers/otp.controller';
import { OtpService } from '../services/otp.service';

@Module({
  imports: [AuthModule],
  controllers: [OtpController],
  providers: [OtpService, OtpRestClient],
})
export class OtpModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(OtpController);
  }
}
