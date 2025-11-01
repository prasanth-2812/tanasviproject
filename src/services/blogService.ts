/**
 * Blog Service
 * Handles blog operations including listing, fetching by slug, and image URL resolution
 */

import { apiClient, ApiClientError } from './ApiClient';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedDate?: string;
  featuredImage?: string;
  coverImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  status?: 'Draft' | 'Published';
}

export interface BlogListResponse {
  items?: BlogPost[];
  [key: string]: any; // Allow for other response formats
}

/**
 * Resolve image URL to full URL
 * Handles relative paths, absolute paths, and external URLs
 */
export const resolveImageUrl = (src?: string): string => {
  if (!src) return '';

  const baseUrl = apiClient.getBaseUrl();
  const normalized = src.replace(/\\/g, '/');

  // If already an external URL, return as is
  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  // Handle absolute paths
  const path = normalized.startsWith('/') ? normalized : `/${normalized}`;
  // Remove duplicate slashes but preserve http:// or https://
  return `${baseUrl}${path}`.replace(/([^:]\/)\/+/g, '$1/');
};

/**
 * Rewrite content HTML to resolve upload image paths
 * Processes blog content HTML to ensure all upload images use correct base URL
 */
export const rewriteContentImageSrc = (html: string): string => {
  if (!html) return html;

  const baseUrl = apiClient.getBaseUrl();

  return html
    // Remove script tags for security
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    // Handle various upload path formats
    .replace(/src=["']\\+uploads\\+([^"']+)["']/gi, (_m, p1) => `src="${baseUrl}/uploads/${p1}"`)
    .replace(/src=["']\/uploads\/([^"']+)["']/gi, (_m, p1) => `src="${baseUrl}/uploads/${p1}"`)
    .replace(/src=["']uploads\/([^"']+)["']/gi, (_m, p1) => `src="${baseUrl}/uploads/${p1}"`)
    .replace(/src=["']\/\/uploads\/([^"']+)["']/gi, (_m, p1) => `src="${baseUrl}/uploads/${p1}"`);
};

/**
 * Get list of blogs
 * @param status Optional filter by status (e.g., 'Published')
 */
export const listBlogs = async (
  status?: string,
  signal?: AbortSignal
): Promise<BlogPost[]> => {
  try {
    const endpoint = status ? `/api/blogs?status=${status}` : '/api/blogs';
    const response = await apiClient.get<BlogPost[] | BlogListResponse>(
      endpoint,
      { signal }
    );

    // Handle different response formats
    if (Array.isArray(response)) {
      return response;
    }

    if (typeof response === 'object' && 'items' in response && Array.isArray(response.items)) {
      return response.items;
    }

    return [];
  } catch (error: any) {
    throw error;
  }
};

/**
 * Get blog post by slug
 */
export const getBlog = async (
  slug: string,
  signal?: AbortSignal
): Promise<BlogPost> => {
  try {
    const response = await apiClient.get<BlogPost>(`/api/blogs/${slug}`, { signal });
    return response;
  } catch (error: any) {
    // Check for 404 status from ApiClientError
    if (error instanceof ApiClientError && error.status === 404) {
      throw new Error('Blog post not found');
    }
    throw error;
  }
};

/**
 * Get related blogs (future enhancement)
 * Can be extended when backend supports this endpoint
 */
export const getRelatedBlogs = async (
  slug: string,
  limit: number = 3,
  signal?: AbortSignal
): Promise<BlogPost[]> => {
  try {
    // This endpoint may not exist yet, but prepared for future use
    const response = await apiClient.get<BlogPost[] | BlogListResponse>(
      `/api/blogs/${slug}/related?limit=${limit}`,
      { signal }
    );

    if (Array.isArray(response)) {
      return response.slice(0, limit);
    }

    if (typeof response === 'object' && 'items' in response && Array.isArray(response.items)) {
      return response.items.slice(0, limit);
    }

    return [];
  } catch (error: any) {
    // If endpoint doesn't exist, return empty array
    return [];
  }
};

export default {
  listBlogs,
  getBlog,
  getRelatedBlogs,
  resolveImageUrl,
  rewriteContentImageSrc,
};

