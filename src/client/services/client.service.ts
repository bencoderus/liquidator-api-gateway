import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ClientRestClient } from '../client/client.rest';
import { Client } from '../types/client.type';
import { ClientVerification } from '../types/verification.type';

@Injectable()
export class ClientService {
  constructor(
    private clientRestClient: ClientRestClient,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async verifyApiKey(apiKey: string): Promise<Client> {
    const cached: Client = await this.cacheManager.get(apiKey);

    if (cached) {
      return cached;
    }

    const response: ClientVerification =
      await this.clientRestClient.getClientByApiKey(apiKey);

    if (!response.isValid) {
      throw new UnauthorizedException('API key is not valid.');
    }

    await this.cacheManager.set(apiKey, response.client);

    return response.client;
  }
}
