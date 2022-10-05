import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IClientRequest } from '../../common/interfaces/client-request.interface';

export const ApiKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: IClientRequest = ctx.switchToHttp().getRequest();

    return request.apiKey;
  },
);
