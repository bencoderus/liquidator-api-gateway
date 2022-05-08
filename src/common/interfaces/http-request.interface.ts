export interface IHttpRequest {
  url: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  params?: Record<string, string>;
  headers?: Record<string, string>;
  data?: Record<string, string>;
}
