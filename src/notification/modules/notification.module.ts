import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/modules/auth.module';
import { NotificationRestClient } from '../clients/notification.rest';
import { OtpController } from '../controllers/otp.controller';
import { OtpService } from '../services/otp.service';

@Module({
  imports: [AuthModule],
  controllers: [OtpController],
  providers: [OtpService, NotificationRestClient],
})
export class NotificationModule {}
