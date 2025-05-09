
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SupplierUpload } from '@/types/supplier-uploads';

/**
 * Function to fetch supplier uploads from Supabase
 * @param options Optional configuration object
 * @returns Promise resolving to an array of SupplierUpload objects
 */
const fetchSupplierUploads = async (
  options?: { forAllocation?: boolean; supplierId?: string }
): Promise<SupplierUpload[]> => {
  // Build the base query
  let query = supabase
    .from('supplier_cost_uploads')
    .select(`
      *,
      suppliers:supplier_id (
        name
      )
    `);
  
  // Add filters based on options
  if (options?.supplierId) {
    if (options.supplierId === 'holding') {
      // For holding bucket - files without a supplier
      query = query.is('supplier_id', null);
    } else {
      // For specific supplier
      query = query.eq('supplier_id', options.supplierId);
    }
  }
  
  // Execute the query and order by created_at
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  
  // Transform data to include supplier_name for easier access
  return (data || []).map(item => ({
    ...item,
    supplier_name: item.suppliers?.name || null,
    // Add for_allocation property for backward compatibility
    for_allocation: options?.forAllocation || false
  })) as SupplierUpload[];
};

/**
 * Hook to fetch supplier uploads with React Query
 * @param options Optional configuration for filtering uploads
 * @returns Query result containing uploads data and status
 */
export const useSupplierUploads = (
  options?: { forAllocation?: boolean; supplierId?: string }
) => {
  return useQuery({
    queryKey: ['supplier-uploads', options],
    queryFn: () => fetchSupplierUploads(options)
  });
};
