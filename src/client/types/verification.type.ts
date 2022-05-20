import { Client } from './client.type';

export type ClientVerification = {
  isValid: boolean;
  client: Client;
};
