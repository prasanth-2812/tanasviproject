/**
 * Career Service
 * Handles career application submissions with resume file uploads
 */

import { apiClient, ApiClientError } from './ApiClient';

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  resume: File | null;
}

export interface CareerResponse {
  message: string;
  success?: boolean;
}

export interface CareerErrorResponse {
  message: string;
  details?: Array<{ msg: string; param?: string; location?: string }>;
}

/**
 * Submit career application with resume
 * Uses FormData to handle file upload
 */
export const applyCareer = async (data: CareerFormData): Promise<CareerResponse> => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position', data.position);
    formData.append('message', data.message || '');

    if (data.resume) {
      formData.append('resume', data.resume);
    }

    const response = await apiClient.post<CareerResponse>('/api/career/apply', formData);
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
  applyCareer,
};

