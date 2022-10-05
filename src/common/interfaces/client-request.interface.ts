import { Request } from 'express';
import { Client } from '../../client/types/client.type';

export interface IClientRequest extends Request {
  client: Client;
  apiKey: string;
}
