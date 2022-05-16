import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandlerFilter } from './common/filters/exception-handler.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const appName = configService.get<string>('app.name');

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      exceptionFactory: (errors: ValidationError[]) => {
        return 'Hello';
        return errors.map((error) => {
          return error.property;
        });
      },
      validationError: {
        target: true,
        value: true,
      },
      // exceptionFactory: (errors: ValidationError[]) => {
      //   const errorsMessages = errors.map((error: ValidationError) => {
      //     const format = {};
      //     format[error.property] = Object.values(error.constraints);

      //     return format;
      //   });

      //   console.log(errorsMessages);
      // },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionHandlerFilter(adapterHost));

  console.log(`${appName} is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
