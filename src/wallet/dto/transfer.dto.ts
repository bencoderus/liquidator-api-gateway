import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class WalletTransferDto {
  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsNotEmpty()
  @IsEmail()
  recipientEmail: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  @IsString()
  walletType: string;
}
