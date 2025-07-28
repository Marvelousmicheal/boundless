// Environment validation
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL environment variable is not defined'
  );
}

// Types for API responses
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

// Request configuration interface
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

// Create fetch-based API client
const createClientApi = () => {
  const baseURL = API_BASE_URL;

  const createRequestConfig = (config?: RequestConfig): RequestInit => ({
    credentials: 'include', // Important: enables sending HTTP-only cookies
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config?.headers,
    },
  });

  const handleResponse = async <T>(
    response: Response
  ): Promise<ApiResponse<T>> => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  };

  const makeRequest = async <T>(
    url: string,
    options: RequestInit & { config?: RequestConfig } = {}
  ): Promise<ApiResponse<T>> => {
    const { config, ...requestOptions } = options;
    const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

    const response = await fetch(fullUrl, {
      ...createRequestConfig(config),
      ...requestOptions,
    });

    return handleResponse<T>(response);
  };

  return {
    get: <T = unknown>(
      url: string,
      config?: RequestConfig
    ): Promise<ApiResponse<T>> =>
      makeRequest<T>(url, { method: 'GET', config }),

    post: <T = unknown>(
      url: string,
      data?: unknown,
      config?: RequestConfig
    ): Promise<ApiResponse<T>> =>
      makeRequest<T>(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        config,
      }),

    put: <T = unknown>(
      url: string,
      data?: unknown,
      config?: RequestConfig
    ): Promise<ApiResponse<T>> =>
      makeRequest<T>(url, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
        config,
      }),

    patch: <T = unknown>(
      url: string,
      data?: unknown,
      config?: RequestConfig
    ): Promise<ApiResponse<T>> =>
      makeRequest<T>(url, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
        config,
      }),

    delete: <T = unknown>(
      url: string,
      config?: RequestConfig
    ): Promise<ApiResponse<T>> =>
      makeRequest<T>(url, { method: 'DELETE', config }),
  };
};

// Create and export the client API instance
const clientApi = createClientApi();

// Utility functions for common HTTP methods
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
