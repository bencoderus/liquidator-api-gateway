import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  app: process.env.APP_NAME || 'Rate Service',
  environment: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT, 10) || 3000,
}));
