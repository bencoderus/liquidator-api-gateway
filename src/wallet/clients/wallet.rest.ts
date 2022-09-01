import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestClient, RestRequest, RestParser } from '@liquidator/common';
import { WalletData } from '../type/wallet.type';

@Injectable()
export class WalletRestClient extends RestClient {
  private baseUrl: string;
  private readonly logger: Logger = new Logger();

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.get('services.walletService.baseUrl');
  }

  getUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  async getWallets(clientCode: string): Promise<WalletData[]> {
    const url = this.getUrl(`/clients/${clientCode}/wallets`);

    const response = await this.send({
      url,
      method: 'GET',
    });

    return response.getData();
  }

  async getWallet(clientCode: string, walletCode: string): Promise<WalletData> {
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

  async send(requestData: RestRequest): Promise<RestParser> {
    const response = await this.sendRequest(requestData);

    if (response.connectionFailed() || response.serverError()) {
      this.logger.error(response.getException());
      throw new HttpException('Unable to connect to wallet service', 503);
    }

    return response;
  }
}
