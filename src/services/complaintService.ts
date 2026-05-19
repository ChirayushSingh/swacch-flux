import apiClient from '@/lib/api-client';

export const ComplaintService = {
  getComplaints: async (params?: any) => {
    const { data } = await apiClient.get('/complaints', { params });
    return data;
  },

  getComplaintById: async (id: string) => {
    const { data } = await apiClient.get(`/complaints/${id}`);
    return data;
  },

  createComplaint: async (complaintData: any) => {
    const { data } = await apiClient.post('/complaints', complaintData);
    return data;
  },

  assignComplaint: async (complaintId: string, workerId: string) => {
    const { data } = await apiClient.post('/complaints/assign', { complaintId, workerId });
    return data;
  },
};
