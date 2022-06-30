import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { VerifyAdminTokenMiddleware } from '../../auth/middlewares/verify-admin-token.middleware';
import { VerifyTokenMiddleware } from '../../auth/middlewares/verify-token.middleware';
import { ClientRestClient } from '../client/client.rest';
import { ClientAdminController } from '../controllers/admin.controller';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ClientController, ClientAdminController],
  providers: [ClientRestClient, ClientService],
})
export class ClientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(ClientController);
    consumer.apply(VerifyAdminTokenMiddleware).forRoutes(ClientAdminController);
  }
}
