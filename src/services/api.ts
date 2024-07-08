import axios from 'axios';
import { getToken } from './token';

const enum DefaultConfig {
  BaseUrl = 'https://15.design.htmlacademy.pro/six-cities',
  timeout = 5000,
}

export const createApi = () => {
  const api = axios.create({
    baseURL: DefaultConfig.BaseUrl as string,
    timeout: DefaultConfig.timeout as number,
  });

  axios.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
