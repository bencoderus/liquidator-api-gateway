import { RestResponse } from '../types/rest-response.type';

/**
 * Send REST response to client.
 *
 * @param message
 * @param data
 * @returns
 */
export const sendResponse = (
  message: string,
  data: Record<string, any> = null,
): {
  message: string;
  data?: Record<string, any>;
} => {
  const response = { message };

  if (data) {
    response['data'] = data;
  }

  return response;
};

/**
 * Format response data.
 *
 * @param {boolean} status
 * @param {string} message
 * @param {any} data
 * @returns {RestResponse}
 */
export const formatResponse = (
  status: boolean,
  message: string,
  data: any = null,
): RestResponse => {
  const additional = status ? 'data' : 'error';

  const response = { status, message };

  if (data) {
    response[additional] = data;
  }

  return response;
};
