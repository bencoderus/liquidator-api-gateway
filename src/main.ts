import { AppLogger } from '@liquidator/common';
import {
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationParserException } from './common/exceptions/validation.exception';
import { ExceptionHandlerFilter } from './common/filters/exception-handler.filter';
import { NewrelicInterceptor } from './common/interceptors/newrelic.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new AppLogger('Api-Gateway');

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());

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

  app.useGlobalInterceptors(new NewrelicInterceptor());

  app.useGlobalFilters(new ExceptionHandlerFilter(adapterHost));

  await app.listen(port);

  process.on('SIGINT', () => process.exit(0));
  process.on('SIGTERM', () => process.exit(0));

  logger.log(`${appName} is running on the port ${port}.`);
}

bootstrap();
