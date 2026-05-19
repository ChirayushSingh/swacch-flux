import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // 1. Add Authorization Token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Add Tenant ID
    const tenantId = typeof window !== 'undefined' ? localStorage.getItem('tenantId') : null;
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if a token was previously stored (i.e. user was logged in)
      const hadToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
      if (hadToken) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      // Silently reject without console.error — hooks handle the error state
    }
    return Promise.reject(error);
  }
);

export default apiClient;
