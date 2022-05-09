import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const appName = configService.get<string>('app.name');
  console.log(`${appName} is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
