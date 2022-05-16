export type RestResponse = {
  status: boolean;
  message: string;
  data?: any;
  error?: any;
};

export type SuccessResponse = {
  message: string;
  data?: any;
};
