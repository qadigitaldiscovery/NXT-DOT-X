import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Supplier {
  id: string;
  name: string;
  code: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  payment_terms?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  creditRating?: {
    rating: string;
    description: string;
    limit: string;
    score: number;
  };
  performance?: {
    overall: number;
    history: Array<{
      date: string;
      value: number;
    }>;
  };
  reports?: Array<{
    id: string;
    title: string;
    type: string;
    date: string;
    size: string;
    url: string;
  }>;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data } = await axios.get<Supplier[]>(`${API_URL}/api/suppliers`);
      return data;
    }
  });
};

export const useSupplier = (id: string) => {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: async () => {
      const { data } = await axios.get<Supplier>(`${API_URL}/api/suppliers/${id}`);
      return data;
    },
    enabled: !!id
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (supplier: Omit<Supplier, 'id'>) => {
      const { data } = await axios.post<Supplier>(`${API_URL}/api/suppliers`, supplier);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  });
};

export const useCreateBulkSuppliers = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (suppliers: Omit<Supplier, 'id'>[]) => {
      const { data } = await axios.post<Supplier[]>(`${API_URL}/api/suppliers/bulk`, suppliers);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (supplier: Supplier) => {
      const { data } = await axios.put<Supplier>(
        `${API_URL}/api/suppliers/${supplier.id}`,
        supplier
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers', data.id] });
    }
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/api/suppliers/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers', id] });
    }
  });
};
