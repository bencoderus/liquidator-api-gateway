import { RestException } from '../exceptions/rest.exception';
import { RestResponse } from '../types/rest.type';

export class RestParser {
  private data: any;
  private statusCode: number;
  private hasResponse: boolean;
  private exception = '';

  constructor(response: RestResponse | RestException) {
    this.parseResponse(response);
  }

  public successful() {
    return this.statusCode >= 200 && this.statusCode < 300;
  }

  public connectionFailed() {
    return !this.hasResponse;
  }

  public failed() {
    return (
      this.connectionFailed() ||
      !(this.statusCode >= 200 && this.statusCode < 300)
    );
  }

  public clientError() {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  public serverError() {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  public getData() {
    return this.data;
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public responseExists() {
    return this.hasResponse;
  }

  public getException() {
    return this.exception;
  }

  private parseResponse(response: RestResponse | RestException) {
    if (response instanceof RestException) {
      this.parseErrorResponse(response);
    } else {
      this.parseSuccessResponse(response);
    }
  }

  private parseSuccessResponse(response: RestResponse) {
    this.data = response.data;
    this.statusCode = response.status;
    this.hasResponse = true;
  }

  private parseErrorResponse(response: RestException) {
    this.data = response.response;
    this.statusCode = response.responseStatusCode;
    this.hasResponse = response.hasResponse;
    this.exception = response.message;
  }
}
