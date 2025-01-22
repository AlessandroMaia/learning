import axios from 'axios';

export interface IApiResponseError {
  type: 'error';
  codNotificacao: string;
  mensagem: string;
}

export interface IApiResponse<T> {
  type: 'success';
  codNotificacao: string;
  mensagem: string;
  resultado: T;
}

export const apiConfig = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  //timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiConfig.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: {
        type: 'success',
        ...response.data
      },
    };
  },
  (error) => {
    return {
      ...error,
      data: {
        type: 'error',
        ...error.data
      },
    };
  }
);