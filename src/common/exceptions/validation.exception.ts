import { UnprocessableEntityException, ValidationError } from '@nestjs/common';

export class ValidationParserException extends UnprocessableEntityException {
  constructor(errors: ValidationError[]) {
    const errorBag = {};

    errors.forEach((error: ValidationError) => {
      errorBag[error.property] = Object.values(error.constraints);
    });

    super({
      statusCode: 422,
      message: 'Validation failed',
      errors: errorBag,
    });
  }
}
