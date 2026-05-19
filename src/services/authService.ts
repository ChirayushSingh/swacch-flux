import apiClient from '@/lib/api-client';

export const AuthService = {
  login: async (credentials: any) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    if (data.tokens?.access?.token) {
      localStorage.setItem('token', data.tokens.access.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('tenantId', data.user.orgId);
    }
    return data;
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tenantId');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getTenantId: () => {
    return localStorage.getItem('tenantId');
  }
};
