import { registerAs } from '@nestjs/config';

export default registerAs('services', () => ({
  rateService: {
    baseUrl: process.env.RATE_SERVICE_URL || '',
  },
  clientService: {
    baseUrl: process.env.CLIENT_SERVICE_URL || '',
  },
  tradeService: {
    baseUrl: process.env.TRADE_SERVICE_URL || '',
  },
  notificationService: {
    baseUrl: process.env.NOTIFICATION_SERVICE_URL || '',
  },
  walletService: {
    baseUrl: process.env.WALLET_SERVICE_URL || '',
  },
}));
