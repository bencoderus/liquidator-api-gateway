import { HttpException, HttpStatus } from '@nestjs/common';

const validationErrorCode = 422;
const serverErrorCode = 500;

export class ResponseException extends Error {
  private error: any;

  constructor(error: any) {
    super(error);
    this.error = error;
  }

  isServerError(): boolean {
    const httpStatus: number = this.getStatusCode();

    return httpStatus === serverErrorCode;
  }

  isStatusCode(statusCode: number): boolean {
    const httpStatus: number = this.getStatusCode();

    return httpStatus === statusCode;
  }

  isValidationError(): boolean {
    const httpStatus = this.getStatusCode();

    return httpStatus === validationErrorCode;
  }

  getValidationErrors(): string[] | undefined {
    const httpStatus = this.getStatusCode();

    return httpStatus === validationErrorCode
      ? this.error.getResponse()
      : undefined;
  }

  getMessage(): string {
    const httpStatus = this.getStatusCode();

    if (httpStatus === validationErrorCode) {
      return 'Validation error.';
    }

    if (this.error instanceof HttpException) {
      const response: any = this.error.getResponse();

      return response.message ? response.message : response;
    }

    return 'An error ocurred';
  }

  getStackTrace(): string | undefined {
    return this.stack;
  }

  getStatusCode(): number {
    return this.error instanceof HttpException
      ? this.error.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
