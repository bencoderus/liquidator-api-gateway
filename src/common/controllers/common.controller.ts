import { Controller, Get } from '@nestjs/common';
import { SuccessResponse } from '../types/rest-response.type';
import { sendResponse } from '../utils/helper.util';

@Controller()
export class CommonController {
  @Get()
  public index(): SuccessResponse {
    return sendResponse('Liquidation service v1.0.0');
  }
}
