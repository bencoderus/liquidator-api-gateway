import { CacheModule, Module } from '@nestjs/common';
import { ClientRestClient } from 'src/client/client/client.rest';
import { ClientService } from 'src/client/services/client.service';

@Module({
  imports: [CacheModule.register()],
  providers: [ClientService, ClientRestClient],
  exports: [ClientService, ClientRestClient],
})
export class AuthModule {}
