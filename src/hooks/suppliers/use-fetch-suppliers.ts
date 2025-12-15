
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Supplier } from './types';

export function useSuppliers() {
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
      
      return data as Supplier[];
    }
  });
}

export function useSupplier(id: string | undefined) {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await (supabase
        .from('suppliers' as any)
        .select('*')
        .eq('id', id)
        .single() as any);
      
      if (error) {
        console.error(`Error fetching supplier ${id}:`, error);
        toast.error('Failed to load supplier details');
        throw error;
      }
      
      return data as Supplier;
    },
    enabled: !!id
  });
}
