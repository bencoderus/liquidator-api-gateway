import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(message, 422);
  }
}
