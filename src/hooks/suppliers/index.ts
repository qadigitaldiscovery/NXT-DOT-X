
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  website?: string;
  contact_name?: string;
  payment_terms?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Get all suppliers
export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Supplier[];
    }
  });
};

// Get a single supplier
export const useSupplier = (id: string | undefined) => {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Supplier | null;
    },
    enabled: !!id
  });
};

// Create a new supplier
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('suppliers')
        .insert(supplier)
        .select()
        .single();
      
      if (error) throw error;
      return data as Supplier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create supplier: ${error.message}`);
    }
  });
};

// Bulk create suppliers
export const useBulkCreateSuppliers = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (suppliers: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>[]) => {
      const { data, error } = await supabase
        .from('suppliers')
        .insert(suppliers)
        .select();
      
      if (error) throw error;
      return data as Supplier[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Suppliers created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create suppliers: ${error.message}`);
    }
  });
};

// Update a supplier
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...supplier }: Partial<Supplier> & { id: string }) => {
      const { data, error } = await supabase
        .from('suppliers')
        .update(supplier)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Supplier;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers', variables.id] });
      toast.success('Supplier updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update supplier: ${error.message}`);
    }
  });
};

// Delete a supplier
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers', id] });
      toast.success('Supplier deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete supplier: ${error.message}`);
    }
  });
};
