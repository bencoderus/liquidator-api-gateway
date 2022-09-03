import { Injectable } from '@nestjs/common';
import { PaginationData } from '../../common/types/pagination.type';
import { WalletRestClient } from '../clients/wallet.rest';
import { WalletData } from '../type/wallet.type';

@Injectable({})
export class WalletService {
  constructor(private walletClient: WalletRestClient) {}

  public async getWallets(clientCode: string): Promise<WalletData[]> {
    return this.walletClient.getWallets(clientCode);
  }

  public async getWallet(
    clientCode: string,
    walletCode: string,
  ): Promise<WalletData> {
    return this.walletClient.getWallet(clientCode, walletCode);
  }

  public async getWalletHistory(
    clientCode: string,
    walletCode: string,
    paginationData: PaginationData,
  ): Promise<WalletData> {
    return this.walletClient.getWalletHistory(
      clientCode,
      walletCode,
      paginationData,
    );
  }
}
