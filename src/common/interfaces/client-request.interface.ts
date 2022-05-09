import { Request } from 'express';
import { IClient } from 'src/client/interfaces/client.interface';

export interface IClientRequest extends Request {
  client: IClient;
}
