import { Client } from './client.type';

export type ClientVerification = {
  authorized: boolean;
  client: Client;
};
