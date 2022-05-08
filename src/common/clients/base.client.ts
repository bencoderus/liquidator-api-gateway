import axios from 'axios';
import { RestException } from '../exceptions/rest.exception';
import { IHttpRequest } from '../interfaces/http-request.interface';

export class BaseClient {
  buildRequest(requestData: IHttpRequest) {
    const request: any = {
      method: requestData.method,
      url: requestData.url,
    };

    if (requestData.data && requestData.method !== 'GET') {
      request.payload = requestData.data;
    }

    if (requestData.data && requestData.method === 'GET') {
      request.params = requestData.data;
    }

    if (requestData.headers) {
      request.headers = requestData.headers;
    }

    return request;
  }

  async sendRequest(requestData: IHttpRequest) {
    try {
      const request = this.buildRequest(requestData);
      const response = await axios(request);

      return response.data;
    } catch (error) {
      throw new RestException(error);
    }
  }
}
