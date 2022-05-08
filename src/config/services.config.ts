import { registerAs } from '@nestjs/config';

export default registerAs('services', () => ({
  rateService: {
    baseUrl: process.env.RATE_SERVICE_URL || '',
  },
  clientService: {
    baseUrl: process.env.CLIENT_SERVICE_URL || '',
  },
}));
