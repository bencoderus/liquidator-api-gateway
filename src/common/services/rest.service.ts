import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RestException } from '../exceptions/rest.exception';
import { IHttpRequest } from '../interfaces/http-request.interface';

@Injectable()
export class RestService {
  buildRequest(requestData: IHttpRequest) {
    const request: any = {
      method: requestData.method,
      url: requestData.url,
    };

    if (requestData.data && requestData.method !== 'GET') {
      request.data = requestData.data;
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
