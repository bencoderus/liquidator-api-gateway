import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RestException } from '../exceptions/rest.exception';
import { RestRequest, RestResponse } from '../types/rest.type';
import { RestParser } from './rest-parser.service';

@Injectable()
export class RestService {
  /**
   * Send REST sync request.
   *
   * @param {RestResponse} requestData
   *
   * @returns {Promise<RestParser>}
   */
  public async sendRequest(requestData: RestRequest): Promise<RestParser> {
    try {
      const request = this.buildRequest(requestData);
      const response: RestResponse = await axios(request);

      return new RestParser(response);
    } catch (error) {
      const restException = new RestException(error);

      return new RestParser(restException);
    }
  }

  /**
   * Build rest request using the request object.
   *
   * @param {RestRequest} requestData
   *
   * @returns {RestRequest}
   */
  private buildRequest(requestData: RestRequest): RestRequest {
    const request: RestRequest = {
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
}
