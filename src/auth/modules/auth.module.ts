import { CacheModule, Module } from '@nestjs/common';
import { ClientRestClient } from '../../client/client/client.rest';
import { ClientService } from '../../client/services/client.service';

@Module({
  imports: [CacheModule.register()],
  providers: [ClientService, ClientRestClient],
  exports: [ClientService, ClientRestClient],
})
export class AuthModule {}
