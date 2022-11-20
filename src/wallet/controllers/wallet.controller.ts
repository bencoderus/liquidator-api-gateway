import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Client } from '../../client/types/client.type';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { PaginationData } from '../../common/types/pagination.type';
import { SuccessResponse } from '../../common/types/rest-response.type';
import { sendResponse } from '../../common/utils/helper.util';
import { WalletTransferDto } from '../dto/transfer.dto';
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

  @Get('/wallets/:code/history')
  public async getWalletHistory(
    @Auth() client: Client,
    @Param('code') code: string,
    @Pagination() paginationData: PaginationData,
  ): Promise<SuccessResponse> {
    const wallet = await this.walletService.getWalletHistory(
      client.code,
      code,
      paginationData,
    );

    return sendResponse('Wallet retrieved successfully.', wallet);
  }

  @Get('/wallets')
  public async getWallets(@Auth() client: Client): Promise<SuccessResponse> {
    const wallet = await this.walletService.getWallets(client.code);

    return sendResponse('Wallets retrieved successfully.', wallet);
  }

  @Post('/wallets/transfer')
  public async transfer(
    @Auth() client: Client,
    @Body() body: WalletTransferDto,
  ): Promise<SuccessResponse> {
    await this.walletService.walletTransfer(client.code, body);

    return sendResponse('Wallet transfer completed successfully.');
  }
}
