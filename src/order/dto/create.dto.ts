import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  order_type: string;
  @IsNotEmpty()
  side: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  currency: string;
  @IsNotEmpty()
  currency_pair: string;
}
