import axios, { AxiosError, AxiosResponse } from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

const enum DefaultConfig {
  BaseUrl = 'https://15.design.htmlacademy.pro/six-cities',
  timeout = 5000,
}

export const createApi = () => {
  const api = axios.create({
    baseURL: DefaultConfig.BaseUrl as string,
    timeout: DefaultConfig.timeout as number,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
