
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Supplier } from './types';

export function useSuppliers() {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async (): Promise<Supplier[]> => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching suppliers:', error);
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });
}

export function useSupplier(id: string | undefined) {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: async (): Promise<Supplier | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching supplier:', error);
        throw new Error(error.message);
      }
      
      return data;
    },
    enabled: !!id
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (supplier: Omit<Supplier, 'id'>) => {
      const { data, error } = await supabase
        .from('suppliers')
        .insert(supplier)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating supplier:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast.success('Supplier created successfully');
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to create supplier: ${error.message}`);
    }
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (supplier: Supplier) => {
      const { id, ...supplierData } = supplier;
      const { data, error } = await supabase
        .from('suppliers')
        .update(supplierData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating supplier:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      toast.success('Supplier updated successfully');
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['supplier', data.id] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update supplier: ${error.message}`);
    }
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting supplier:', error);
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      toast.success('Supplier deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to delete supplier: ${error.message}`);
    }
  });
}
