import { Module } from '@nestjs/common';
import { CommonController } from '../controllers/common.controller';
import { CommonService } from '../services/common.service';
import { AppConfigModule } from './config.module';

@Module({
  controllers: [CommonController],
  imports: [AppConfigModule],
  providers: [CommonService],
})
export class CommonModule {}
