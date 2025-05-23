
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface BulkSupplierData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  category?: string;
}

export const useBulkCreateSuppliers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (suppliers: BulkSupplierData[]) => {
      // Mock implementation for bulk supplier creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate processing each supplier
      const results = suppliers.map((supplier, index) => ({
        ...supplier,
        id: `supplier-${Date.now()}-${index}`,
        created_at: new Date().toISOString(),
        status: 'active'
      }));

      return results;
    },
    onSuccess: (data) => {
      toast.success(`Successfully created ${data.length} suppliers`);
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (error) => {
      console.error('Error creating suppliers:', error);
      toast.error('Failed to create suppliers');
    }
  });
};
