import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IClientRequest } from '../../common/interfaces/client-request.interface';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from '../constants/pagination.constant';
import { PaginationData } from '../types/pagination.type';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationData => {
    const request: IClientRequest = ctx.switchToHttp().getRequest();

    const pageQuery = request.query.page as unknown as string;
    const perPageQuery = request.query.limit as unknown as string;

    const page = parseInt(pageQuery, 10) || DEFAULT_PAGE_NUMBER;
    const limit = parseInt(perPageQuery, 10) || DEFAULT_PAGE_SIZE;

    return {
      pageNumber: page < 1 ? DEFAULT_PAGE_NUMBER : page,
      perPage: limit < 1 ? DEFAULT_PAGE_SIZE : limit,
    };
  },
);
