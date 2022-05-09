import { CacheModule, Module } from '@nestjs/common';
import { ClientRestClient } from '../client/client.rest';
import { ClientService } from '../services/client.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [],
  providers: [ClientRestClient, ClientService],
})
export class ClientModule {}
