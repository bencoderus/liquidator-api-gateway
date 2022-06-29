import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { sendResponse } from '../../common/utils/helper.util';
import { CreateOrderDto } from '../dto/create.dto';

@Controller('orders')
export class OrderController {
  @Post('/')
  @HttpCode(200)
  create(@Body() body: CreateOrderDto) {
    return 'Hello world';
  }
}
