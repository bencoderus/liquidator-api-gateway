import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyTokenMiddleware } from '../../auth/middlewares/verify-token.middleware';
import { ClientRestClient } from '../client/client.rest';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ClientController],
  providers: [ClientRestClient, ClientService],
})
export class ClientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('clients');
  }
}
