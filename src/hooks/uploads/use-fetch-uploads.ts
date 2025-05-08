
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

      // If forAllocation is specified as true, filter for for_allocation=true
      // If forAllocation is specified as false, filter for for_allocation=false
      // If forAllocation is undefined or null, don't filter by for_allocation
      if (forAllocation !== undefined && forAllocation !== null) {
        query = query.eq('for_allocation', forAllocation);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      
      // Transform data to include supplier_name for easier access
      return (data || []).map(item => ({
        ...item,
        supplier_name: item.suppliers?.name || null,
        // Ensure for_allocation is present and boolean
        for_allocation: item.for_allocation === true
      }));
    }
  });
};

