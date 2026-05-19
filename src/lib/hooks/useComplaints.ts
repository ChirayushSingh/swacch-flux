'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ComplaintService } from '@/services/complaintService';

function isAuthenticated() {
  return typeof window !== 'undefined' && !!localStorage.getItem('token');
}

export function useComplaints(filters?: any) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['complaints', filters],
    queryFn: () => ComplaintService.getComplaints(filters),
    enabled: isAuthenticated(),
    retry: false,
    staleTime: 30_000,
  });

  const assignMutation = useMutation({
    mutationFn: ({ complaintId, workerId }: { complaintId: string, workerId: string }) => 
      ComplaintService.assignComplaint(complaintId, workerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });

  return {
    complaints: data?.complaints || [],
    total: data?.total || 0,
    loading: isLoading,
    error,
    assignComplaint: assignMutation.mutate,
    isAssigning: assignMutation.isPending,
  };
}

export function useComplaint(id: string) {
  return useQuery({
    queryKey: ['complaint', id],
    queryFn: () => ComplaintService.getComplaintById(id),
    enabled: !!id && isAuthenticated(),
    retry: false,
  });
}
