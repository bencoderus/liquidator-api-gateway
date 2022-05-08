import { Module } from '@nestjs/common';
import { CommonService } from '../services/common.service';
import { AppConfigModule } from './config.module';

@Module({
  imports: [AppConfigModule],
  providers: [CommonService],
})
export class CommonModule {}
