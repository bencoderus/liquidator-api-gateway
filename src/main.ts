import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandlerFilter } from './common/filters/exception-handler.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const adapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const appName = configService.get<string>('app.name');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      exceptionFactory: (errors: ValidationError[]) => {
        return errors.map((error) => {
          return error.property;
        });
      },
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new ExceptionHandlerFilter(adapterHost));

  console.log(`${appName} is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
