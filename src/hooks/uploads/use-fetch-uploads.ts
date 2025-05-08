
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SupplierUpload } from '@/types/supplier-uploads';

export function useSupplierUploads(supplierId?: string, includeHolding: boolean = false) {
  return useQuery({
    queryKey: ['supplier-uploads', supplierId, includeHolding],
    queryFn: async () => {
      let query = supabase
        .from('supplier_cost_uploads')
        .select(`
          *,
          suppliers:supplier_id (name)
        `);

      if (supplierId && supplierId !== 'holding') {
        query = query.eq('supplier_id', supplierId);
      } else if (includeHolding && !supplierId) {
        // Include both regular uploads and holding bucket
      } else if (supplierId === 'holding') {
        // Only get holding bucket uploads
        query = query.eq('for_allocation', true);
      } else if (!includeHolding) {
        // Skip holding bucket uploads
        query = query.eq('for_allocation', false);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching supplier uploads:', error);
        toast.error('Failed to load supplier uploads');
        throw error;
      }
      
      // Transform the nested objects
      const transformedData = data.map(item => ({
        ...item,
        supplier_name: item.for_allocation === true ? 'Holding Bucket' : (item.suppliers?.name || 'Unknown Supplier')
      })) as SupplierUpload[];
      
      return transformedData;
    }
  });
}
