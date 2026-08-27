const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('lifedrop_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const fullUrl = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text || response.statusText };
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `API error (${response.status})`);
    }

    return data;
  } catch (err: any) {
    // If external PHP backend connection failed (e.g. localhost:8000 is not running),
    // attempt local Next.js internal API route fallback if available
    if (
      (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) &&
      !endpoint.startsWith('/api/v1')
    ) {
      console.warn(`[LifeDrop API] External PHP backend unreachable at ${fullUrl}. Trying local fallback route /api/v1${endpoint}`);
      try {
        const localUrl = `/api/v1${endpoint}`;
        const localResponse = await fetch(localUrl, {
          ...options,
          headers,
        });
        if (localResponse.ok) {
          return await localResponse.json();
        }
      } catch (fallbackErr) {
        // Ignore fallback error
      }
    }
    
    throw err;
  }
}