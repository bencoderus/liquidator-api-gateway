import { Module } from '@nestjs/common';
import { CommonController } from '../controllers/common.controller';
import { HealthController } from '../controllers/health.controller';
import { CommonService } from '../services/common.service';
import { AppConfigModule } from './config.module';

@Module({
  controllers: [CommonController, HealthController],
  imports: [AppConfigModule],
  providers: [CommonService],
})
export class CommonModule {}
