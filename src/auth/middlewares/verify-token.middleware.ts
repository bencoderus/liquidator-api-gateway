import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ClientService } from '../../client/services/client.service';
import { Client } from '../../client/types/client.type';
import { IClientRequest } from '../../common/interfaces/client-request.interface';
import { getTokenFromHeader } from '../../common/utils/helper.util';
import { AUTH_HEADER } from '../constants/auth.constant';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private clientService: ClientService) {}

  async use(req: IClientRequest, res: Response, next: NextFunction) {
    const header = req.headers[AUTH_HEADER];
    const apiKey = getTokenFromHeader(header);

    if (!apiKey) {
      throw new UnauthorizedException('API key is not set.');
    }

    const client: Client = await this.clientService.verifyApiKey(apiKey);

    req.client = client;

    next();
  }
}
