import { Injectable } from '@nestjs/common';
import { PaginationData } from '../../common/types/pagination.type';
import { WalletRestClient } from '../clients/wallet.rest';
import {
  WalletData,
  WalletTransferRequest,
  WalletTransferResponse,
} from '../type/wallet.type';

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

  public async walletTransfer(
    clientCode: string,
    data: Omit<WalletTransferRequest, 'senderCode'>,
  ): Promise<WalletTransferResponse> {
    return this.walletClient.transfer({
      senderCode: clientCode,
      ...data,
    });
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
