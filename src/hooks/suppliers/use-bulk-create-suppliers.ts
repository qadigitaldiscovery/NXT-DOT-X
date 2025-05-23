
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Supplier } from './types';

export function useBulkCreateSuppliers() {
  const [isLoading, setIsLoading] = useState(false);

  const bulkCreateSuppliers = async (suppliers: Omit<Supplier, 'id'>[]) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert(suppliers)
        .select();

      if (error) {
        throw error;
      }

      toast.success(`Successfully created ${data.length} suppliers`);
      return { data, error: null };
    } catch (error) {
      console.error('Error bulk creating suppliers:', error);
      toast.error('Failed to create suppliers');
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { bulkCreateSuppliers, isLoading };
}
