import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ClientService } from 'src/client/services/client.service';
import { Client } from 'src/client/types/client.type';
import { IClientRequest } from 'src/common/interfaces/client-request.interface';
import { getTokenFromHeader } from 'src/common/utils/helper.util';
import { authHeader } from '../constants/auth.constant';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private clientService: ClientService) {}

  async use(req: IClientRequest, res: Response, next: NextFunction) {
    const header = req.headers[authHeader];
    const apiKey = getTokenFromHeader(header);

    if (!apiKey) {
      throw new UnauthorizedException('API key is not set.');
    }

    const client: Client = await this.clientService.verifyApiKey(apiKey);

    req.client = client;

    next();
  }
}
