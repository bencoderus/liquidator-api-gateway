import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseException } from '../exceptions/response.exception';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const responseException = new ResponseException(exception);

    const responseBody = this.getResponseBody(responseException);

    if (this.shouldReport(responseException)) {
      console.error(exception);
    }

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      responseException.getStatusCode(),
    );
  }

  private shouldReport(exception: ResponseException): boolean {
    const statusCode = exception.getStatusCode();

    if ([422].includes(statusCode)) {
      return false;
    }

    return true;
  }

  private getResponseBody(exception: ResponseException) {
    const response = { status: false, message: exception.getMessage() };

    if (exception.isValidationError()) {
      const responseBody: any = exception.getValidationErrors();
      response['error'] = responseBody;
    }

    if (exception.isServerError()) {
      response['exception'] = exception.getStackTrace();
    }

    return response;
  }
}
