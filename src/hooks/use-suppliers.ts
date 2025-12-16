import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Supplier {
  id: string;
  name: string;
  code?: string;
  email?: string;
  phone?: string;
  address?: string;
  contact_name?: string;
  website?: string;
  payment_terms?: string;
  status: string;
  created_at: string;
}

export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from('suppliers' as any)
        .select('*')
        .order('name') as any);
      
      if (error) {
        console.error('Error fetching suppliers:', error);
        toast.error('Failed to load suppliers');
        throw error;
      }
      
      return (data || []) as Supplier[];
    }
  });
};

export const useSupplier = (id?: string) => {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await (supabase
        .from('suppliers' as any)
        .select('*')
        .eq('id', id)
        .maybeSingle() as any);
      
      if (error) {
        console.error(`Error fetching supplier ${id}:`, error);
        toast.error('Failed to load supplier details');
        throw error;
      }
      
      return data as Supplier | null;
    },
    enabled: !!id
  });
};

export const useCreateSupplier = () => {
  return {
    mutate: (data: Omit<Supplier, 'id'>) => {
      console.log('Creating supplier:', data);
    },
    isPending: false
  };
};

export const useDeleteSupplier = () => {
  return {
    mutate: (id: string, options?: { onSuccess?: () => void }) => {
      console.log('Deleting supplier:', id);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    isPending: false
  };
};
