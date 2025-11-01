import { useEffect } from 'react';

const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) return import.meta.env.VITE_API_URL;
  return 'http://localhost:5000';
};

export function usePageTracker(pageName) {
  useEffect(() => {
    if (!pageName) return;
    const controller = new AbortController();
    const base = getBaseUrl().replace(/\/$/, '');
    fetch(`${base}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pageName }),
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [pageName]);
}

export default usePageTracker;


