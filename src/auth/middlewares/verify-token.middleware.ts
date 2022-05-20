import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ClientService } from 'src/client/services/client.service';
import { IClientRequest } from 'src/common/interfaces/client-request.interface';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private clientService: ClientService) {}

  async use(req: IClientRequest, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('API key is not set.');
    }

    const client = await this.clientService.verifyApiKey(apiKey);

    req.client = client;

    next();
  }
}
