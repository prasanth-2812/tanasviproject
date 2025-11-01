/**
 * Contact Service
 * Handles contact form submissions
 */

import { apiClient, ApiClientError } from './ApiClient';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  success?: boolean;
}

export interface ContactErrorResponse {
  message: string;
  details?: Array<{ msg: string; param?: string; location?: string }>;
}

/**
 * Send contact form submission
 */
export const sendContact = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await apiClient.post<ContactResponse>('/api/contact/send', data);
    return response;
  } catch (error: any) {
    // Re-throw ApiClientError with extracted details for better error handling
    if (error instanceof ApiClientError && error.details) {
      // Format validation errors if available
      if (Array.isArray(error.details)) {
        const validationErrors = error.details.map((err: any) => err.msg).join(', ');
        if (validationErrors) {
          throw new ApiClientError(validationErrors, error.status, error.details);
        }
      }
    }
    throw error;
  }
};

export default {
  sendContact,
};

