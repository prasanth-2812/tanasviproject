/**
 * Centralized API Client for Tanasvi Technologies Frontend
 * Handles all HTTP requests with consistent error handling and base URL configuration
 */

const getBaseUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'https://backend.mcb5.in';
};

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export class ApiClientError extends Error {
  status?: number;
  details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getBaseUrl();
  }

  /**
   * Get the base URL of the API
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Build full URL from endpoint
   */
  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const cleanBaseUrl = this.baseUrl.replace(/\/$/, '');
    return `${cleanBaseUrl}${cleanEndpoint}`;
  }

  /**
   * Handle response and extract error information
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorDetails: any = null;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errorDetails = errorData.details || null;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new ApiClientError(errorMessage, response.status, errorDetails);
    }

    try {
      return await response.json();
    } catch (e) {
      throw new ApiClientError('Invalid JSON response from server', response.status);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const url = this.buildUrl(endpoint);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        signal: options?.signal,
      });

      return this.handleResponse<T>(response);
    } catch (error: any) {
      // Preserve native aborts so callers can detect and ignore them
      if (error?.name === 'AbortError') throw error;
      if (error instanceof ApiClientError) throw error;
      throw new ApiClientError(
        error?.message || 'Network error. Please check your connection and try again.',
        0
      );
    }
  }

  /**
   * POST request with JSON body
   */
  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const url = this.buildUrl(endpoint);
      const isFormData = data instanceof FormData;

      const response = await fetch(url, {
        method: 'POST',
        headers: isFormData
          ? { ...options?.headers }
          : {
              'Content-Type': 'application/json',
              ...options?.headers,
            },
        body: isFormData ? data : data ? JSON.stringify(data) : undefined,
        signal: options?.signal,
      });

      return this.handleResponse<T>(response);
    } catch (error: any) {
      if (error?.name === 'AbortError') throw error;
      if (error instanceof ApiClientError) throw error;
      throw new ApiClientError(
        error?.message || 'Network error. Please check your connection and try again.',
        0
      );
    }
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const url = this.buildUrl(endpoint);
      const isFormData = data instanceof FormData;

      const response = await fetch(url, {
        method: 'PUT',
        headers: isFormData
          ? { ...options?.headers }
          : {
              'Content-Type': 'application/json',
              ...options?.headers,
            },
        body: isFormData ? data : data ? JSON.stringify(data) : undefined,
        signal: options?.signal,
      });

      return this.handleResponse<T>(response);
    } catch (error: any) {
      if (error?.name === 'AbortError') throw error;
      if (error instanceof ApiClientError) throw error;
      throw new ApiClientError(
        error?.message || 'Network error. Please check your connection and try again.',
        0
      );
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const url = this.buildUrl(endpoint);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        signal: options?.signal,
      });

      return this.handleResponse<T>(response);
    } catch (error: any) {
      if (error?.name === 'AbortError') throw error;
      if (error instanceof ApiClientError) throw error;
      throw new ApiClientError(
        error?.message || 'Network error. Please check your connection and try again.',
        0
      );
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;

