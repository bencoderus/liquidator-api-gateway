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

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionHandlerFilter(adapterHost));

  console.log(`${appName} is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
