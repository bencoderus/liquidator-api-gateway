export class RestException extends Error {
  public name: string;
  public hasResponse: boolean;
  public response: any;
  public responseStatusCode: number;

  constructor(error: any) {
    super(error.message);
    this.name = 'RestException';
    this.hasResponse = !!error.response;
    this.response = error.response ? error.response.data : null;
    this.responseStatusCode = error.response ? error.response.status : 0;
  }
}
