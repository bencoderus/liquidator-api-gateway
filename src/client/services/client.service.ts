import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { PaginationData } from '../../common/types/pagination.type';
import { ClientRestClient } from '../client/client.rest';
import { Client } from '../types/client.type';
import { ClientVerification } from '../types/verification.type';

@Injectable()
export class ClientService {
  constructor(
    private clientRestClient: ClientRestClient,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private generateCacheKey(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex').toString();
  }

  async verifyApiKey(apiKey: string): Promise<Client> {
    const cacheKey = this.generateCacheKey(apiKey);
    const cached: Client = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const response: ClientVerification =
      await this.clientRestClient.getClientByApiKey(apiKey);

    if (!response.authorized) {
      throw new UnauthorizedException('API key is not valid.');
    }

    await this.cacheManager.set(cacheKey, response.client, { ttl: 900 });

    return response.client;
  }

  async getProfile(clientCode: string): Promise<Client> {
    const client: Client = await this.clientRestClient.getProfile(clientCode);

    return client;
  }

  async getCredentials(clientCode: string): Promise<Client> {
    const client: Client = await this.clientRestClient.getCredentials(
      clientCode,
    );

    return client;
  }

  async getClient(clientCode: string): Promise<Client> {
    const client: Client = await this.clientRestClient.getClient(clientCode);

    return client;
  }

  async getClients(paginationData: PaginationData): Promise<Client[]> {
    const client: Client[] = await this.clientRestClient.getClients(
      paginationData,
    );

    return client;
  }

  async createClient(payload: Record<string, any>): Promise<Client> {
    const client: Client = await this.clientRestClient.createClient(payload);

    return client;
  }

  async updateClientStatus(
    code: string,
    payload: Record<string, any>,
  ): Promise<Client> {
    const client: Client = await this.clientRestClient.updateClientStatus(
      code,
      payload,
    );

    return client;
  }

  async updateWebhookUrl(clientCode: string, payload: any) {
    return this.clientRestClient.updateWebhookUrl(clientCode, payload);
  }
}
