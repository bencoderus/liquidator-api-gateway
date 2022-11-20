import { IsIn, IsNotEmpty } from 'class-validator';
import { SUPPORTED_OTP_PURPOSES } from '../constants/otp.constant';

export class SendOtpDto {
  @IsNotEmpty()
  @IsIn(SUPPORTED_OTP_PURPOSES)
  purpose: string;
}
