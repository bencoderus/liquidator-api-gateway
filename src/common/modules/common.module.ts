import { Module } from '@nestjs/common';
import { CommonController } from '../controllers/common.controller';
import { HealthController } from '../controllers/health.controller';
import { RestService } from '../services/rest.service';
import { AppConfigModule } from './config.module';

@Module({
  controllers: [CommonController, HealthController],
  imports: [AppConfigModule, RestService],
  providers: [RestService],
})
export class CommonModule {}
