import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseException } from '../exceptions/response.exception';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const responseException = new ResponseException(exception);

    const responseBody = this.getResponseBody(responseException);

    if (this.shouldReport(responseException)) {
      this.logger.error(exception);
    }

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      responseException.getStatusCode(),
    );
  }

  private shouldReport(exception: ResponseException): boolean {
    const statusCode = exception.getStatusCode();

    if (statusCode >= 500 && statusCode < 600) {
      return true;
    }

    return false;
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
