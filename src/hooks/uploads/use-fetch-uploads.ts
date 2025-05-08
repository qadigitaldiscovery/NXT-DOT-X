
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SupplierUpload } from '@/types/supplier-uploads';

export const useSupplierUploads = (options?: { forAllocation?: boolean }) => {
  const { forAllocation } = options || {};

  return useQuery({
    queryKey: ['supplier-uploads', { forAllocation }],
    queryFn: async (): Promise<SupplierUpload[]> => {
      let query = supabase
        .from('supplier_cost_uploads')
        .select(`
          *,
          suppliers:supplier_id (
            name
          )
        `);

      // If forAllocation is specified, add it as a parameter to the query
      // Note: We're not filtering by for_allocation since it doesn't exist in the table
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      
      // Transform data to include supplier_name for easier access
      return (data || []).map(item => ({
        ...item,
        supplier_name: item.suppliers?.name || null,
        // We need to add this property for backward compatibility
        for_allocation: false // Since column doesn't exist in the table, default to false
      })) as SupplierUpload[];
    }
  });
};
