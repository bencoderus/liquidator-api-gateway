import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IClientRequest } from '../../common/interfaces/client-request.interface';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: IClientRequest = ctx.switchToHttp().getRequest();

    return request.client;
  },
);
