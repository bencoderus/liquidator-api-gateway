import { Request } from 'express';
import { Client } from 'src/client/types/client.type';

export interface IClientRequest extends Request {
  client: Client;
}
