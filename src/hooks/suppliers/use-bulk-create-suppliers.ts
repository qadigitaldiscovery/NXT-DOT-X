
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SupplierData } from '@/utils/supplier-helpers';

/**
 * React Query hook for bulk creating suppliers
 */
export function useBulkCreateSuppliers() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (suppliers: SupplierData[]) => {
      if (!suppliers.length) {
        throw new Error('No suppliers to create');
      }
      
      // Validate required fields
      for (const supplier of suppliers) {
        if (!supplier.name) {
          throw new Error('Supplier name is required');
        }
        
        if (!supplier.code) {
          throw new Error('Supplier code is required');
        }
      }
      
      // Check for duplicate codes
      const codes = suppliers.map(s => s.code);
      const uniqueCodes = new Set(codes);
      
      if (codes.length !== uniqueCodes.size) {
        throw new Error('Duplicate supplier codes found. Each supplier must have a unique code.');
      }
      
      // Check if any codes already exist in the database
      const { data: existingSuppliers, error: existingError } = await supabase
        .from('suppliers')
        .select('code')
        .in('code', codes);
      
      if (existingError) {
        throw new Error(`Database error: ${existingError.message}`);
      }
      
      if (existingSuppliers && existingSuppliers.length > 0) {
        const existingCodes = existingSuppliers.map(s => s.code);
        throw new Error(`These supplier codes already exist: ${existingCodes.join(', ')}`);
      }
      
      // Insert suppliers
      const { error: insertError } = await supabase
        .from('suppliers')
        .insert(suppliers);
      
      if (insertError) {
        throw new Error(`Failed to insert suppliers: ${insertError.message}`);
      }
      
      return { count: suppliers.length };
    },
    onSuccess: (data) => {
      toast.success(`Successfully imported ${data.count} suppliers`);
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error: Error) => {
      toast.error(`Import failed: ${error.message}`);
    }
  });
}
