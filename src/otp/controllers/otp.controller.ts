import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Client } from '../../client/types/client.type';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { SendOtpDto } from '../dto/send-otp.dto';
import { OtpService } from '../services/otp.service';

@Controller('otp')
export class OtpController {
  constructor(private service: OtpService) {}

  @Post('send')
  public async sendOtp(
    @Auth() client: Client,
    @Body() data: SendOtpDto,
  ): Promise<SuccessResponse> {
    const otp = await this.service.sendOtp(client.code, data.purpose);

    return sendResponse('Otp sent successfully.');
  }
}
