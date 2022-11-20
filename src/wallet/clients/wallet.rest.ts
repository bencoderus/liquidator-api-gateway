import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestClient, RestRequest, RestParser } from '@liquidator/common';
import {
  WalletData,
  WalletTransferRequest,
  WalletTransferResponse,
} from '../type/wallet.type';
import { PaginationData } from '../../common/types/pagination.type';

@Injectable()
export class WalletRestClient extends RestClient {
  private baseUrl: string;
  private readonly logger: Logger = new Logger();

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.walletService.baseUrl');
  }

  private getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  public async getWallets(clientCode: string): Promise<WalletData[]> {
    const url = this.getUrl(`/clients/${clientCode}/wallets`);

    const response = await this.send({
      url,
      method: 'GET',
    });

    return response.getData();
  }

  public async transfer(
    data: WalletTransferRequest,
  ): Promise<WalletTransferResponse> {
    const url = this.getUrl(`/wallets/transfer`);

    const response = await this.send({
      url,
      method: 'POST',
      data,
    });

    const responseData = response.getData();

    if (response.clientError()) {
      throw new HttpException(responseData.message, response.getStatusCode());
    }

    return responseData;
  }

  public async getWalletHistory(
    clientCode: string,
    walletCode: string,
    paginationData: PaginationData,
  ): Promise<any> {
    const url = `/clients/${clientCode}/wallets/${walletCode}/history`;

    const requestData: RestRequest = {
      url: this.getUrl(url),
      method: 'GET',
      data: {
        page: paginationData.pageNumber,
        limit: paginationData.perPage,
      },
    };

    const response = await this.send(requestData);
    const responseData = response.getData();

    if (response.getStatusCode() === 404) {
      throw new HttpException(responseData.message, 404);
    }

    return responseData;
  }

  public async getWallet(
    clientCode: string,
    walletCode: string,
  ): Promise<WalletData> {
    const url = this.getUrl(`/clients/${clientCode}/wallets/${walletCode}`);

    const response = await this.send({
      url,
      method: 'GET',
    });

    if (response.getStatusCode() === 404) {
      throw new HttpException('Wallet not found.', 404);
    }

    return response.getData();
  }

  public async send(requestData: RestRequest): Promise<RestParser> {
    const response = await this.sendRequest(requestData);

    if (response.connectionFailed() || response.serverError()) {
      this.logger.error(response.getException());
      throw new HttpException('Unable to connect to wallet service', 503);
    }

    return response;
  }
}
