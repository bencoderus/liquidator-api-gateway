import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuccessResponse } from '../types/rest-response.type';
import { sendResponse } from '../utils/helper.util';

@Controller()
export class HealthController {
  constructor(private configService: ConfigService) {}

  @Get('health-check')
  public getHealthStatus(): SuccessResponse {
    return sendResponse('Health check status retrieved successfully.', {
      status: 'OK',
      name: this.configService.get('app.name'),
      environment: this.configService.get('app.environment'),
      port: this.configService.get('app.port'),
    });
  }
}
