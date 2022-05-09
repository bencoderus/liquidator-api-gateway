import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ClientRestClient } from '../client/client.rest';
import { IClient } from '../interfaces/client.interface';

@Injectable()
export class ClientService {
  constructor(
    private clientRestClient: ClientRestClient,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getClient(apiKey: string): Promise<IClient> {
    const cached: IClient = await this.cacheManager.get(apiKey);

    if (cached) {
      return cached;
    }

    const client = await this.clientRestClient.getClientByApiKey(apiKey);

    await this.cacheManager.set(apiKey, client);

    return client;
  }
}
