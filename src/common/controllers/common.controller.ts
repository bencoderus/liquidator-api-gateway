import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class CommonController {
  @Get()
  async index() {
    return {
      message: 'Liquidity service v1.0.0',
    };
  }
}
