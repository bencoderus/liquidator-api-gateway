import {
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationParserException } from './common/exceptions/validation.exception';
import { ExceptionHandlerFilter } from './common/filters/exception-handler.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const adapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const appName = configService.get<string>('app.name');

  app.enableCors();

  const validationHandler = new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      return new ValidationParserException(errors);
    },
  });

  app.useGlobalPipes(validationHandler);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new ExceptionHandlerFilter(adapterHost));

  console.log(`${appName} is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
