import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || '';
export const useSuppliers = () => {
    return useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/api/suppliers`);
            return data;
        }
    });
};
export const useSupplier = (id) => {
    return useQuery({
        queryKey: ['suppliers', id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/api/suppliers/${id}`);
            return data;
        },
        enabled: !!id
    });
};
export const useCreateSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (supplier) => {
            const { data } = await axios.post(`${API_URL}/api/suppliers`, supplier);
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
        mutationFn: async (suppliers) => {
            const { data } = await axios.post(`${API_URL}/api/suppliers/bulk`, suppliers);
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
        mutationFn: async (supplier) => {
            const { data } = await axios.put(`${API_URL}/api/suppliers/${supplier.id}`, supplier);
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
        mutationFn: async (id) => {
            await axios.delete(`${API_URL}/api/suppliers/${id}`);
            return id;
        },
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            queryClient.invalidateQueries({ queryKey: ['suppliers', id] });
        }
    });
};
