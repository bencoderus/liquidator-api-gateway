import { Controller, Get, Param } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Client } from '../../client/types/client.type';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { WalletService } from '../services/wallet.service';

@Controller()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('/wallets/:code')
  public async getWallet(
    @Auth() client: Client,
    @Param('code') code: string,
  ): Promise<SuccessResponse> {
    const wallet = await this.walletService.getWallet(client.code, code);

    return sendResponse('Wallet retrieved successfully.', wallet);
  }

  @Get('/wallets')
  public async getWallets(@Auth() client: Client): Promise<SuccessResponse> {
    const wallet = await this.walletService.getWallets(client.code);

    return sendResponse('Wallets retrieved successfully.', wallet);
  }
}
