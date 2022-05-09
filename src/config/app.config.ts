import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'Rate Service',
  environment: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
}));
