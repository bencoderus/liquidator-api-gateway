import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ClientService } from 'src/client/services/client.service';
import { Client } from 'src/client/types/client.type';
import { IClientRequest } from 'src/common/interfaces/client-request.interface';
import { getTokenFromHeader } from 'src/common/utils/helper.util';
import { AUTH_HEADER } from '../constants/auth.constant';

@Injectable()
export class VerifyAdminTokenMiddleware implements NestMiddleware {
  constructor(private clientService: ClientService) {}

  async use(req: IClientRequest, res: Response, next: NextFunction) {
    const header = req.headers[AUTH_HEADER];
    const apiKey = getTokenFromHeader(header);

    if (!apiKey) {
      throw new UnauthorizedException('API key is not set.');
    }

    const client: Client = await this.clientService.verifyApiKey(apiKey);

    if (!client.isAdmin) {
      throw new ForbiddenException("You don't have access to this resource.");
    }

    req.client = client;

    next();
  }
}
