export type RestRequest = {
  url: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  headers?: Record<string, any>;
  data?: Record<string, any>;
};

export type RestResponse = {
  status: number;
  data: any;
};
