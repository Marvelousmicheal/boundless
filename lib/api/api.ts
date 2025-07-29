import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL environment variable is not defined'
  );
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

const createClientApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    config => {
      config.withCredentials = true;

      const accessToken = Cookies.get('accessToken');
      if (accessToken && !config.headers?.Authorization) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    error => {
      if (error.response) {
        const errorData = error.response.data;
        const customError: ApiError = {
          message:
            errorData?.message ||
            `HTTP error! status: ${error.response.status}`,
          status: error.response.status,
          code: errorData?.code,
        };
        return Promise.reject(customError);
      } else if (error.request) {
        return Promise.reject(new Error('Network error: No response received'));
      } else {
        return Promise.reject(new Error(`Request error: ${error.message}`));
      }
    }
  );

  return instance;
};

const axiosInstance = createClientApi();

const convertAxiosResponse = <T>(
  response: AxiosResponse<T>
): ApiResponse<T> => ({
  data: response.data,
  status: response.status,
  statusText: response.statusText,
});

const convertRequestConfig = (config?: RequestConfig): AxiosRequestConfig => ({
  headers: config?.headers,
  timeout: config?.timeout,
  withCredentials: true,
});

const clientApi = {
  get: async <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.get<T>(
      url,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<T>(
      url,
      data,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.put<T>(
      url,
      data,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.patch<T>(
      url,
      data,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  delete: async <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.delete<T>(
      url,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },
};

export const api = {
  get: <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.get<T>(url, config),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.post<T>(url, data, config),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.put<T>(url, data, config),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.patch<T>(url, data, config),

  delete: <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.delete<T>(url, config),
};

export default clientApi;
