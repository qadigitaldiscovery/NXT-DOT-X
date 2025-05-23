import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export const useAssignUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const assignUpload = async (uploadId: string, supplierId: string) => {
    setIsLoading(true);
    
    try {
      // Mock assignment logic
      console.log(`Assigning upload ${uploadId} to supplier ${supplierId}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Upload assigned successfully');
      
      return { success: true, data: { uploadId, supplierId } };
    } catch (error) {
      console.error('Error assigning upload:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast.error('Failed to assign upload', {
        description: errorMessage
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    assignUpload,
    isLoading
  };
};

export const useAssignUploadToSupplier = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      uploadId,
      supplierId
    }: {
      uploadId: string;
      supplierId: string;
    }) => {
      // Update the supplier_cost_uploads table
      const { data, error } = await supabase
        .from('supplier_cost_uploads')
        .update({ 
          supplier_id: supplierId,
          for_allocation: false 
        })
        .eq('id', uploadId)
        .select('file_path, file_name');

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('No data returned after update');
      }

      return { filePath: data[0].file_path, fileName: data[0].file_name };
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      toast({
        description: `File ${result.fileName} has been successfully assigned to a supplier.`
      });
    },
    onError: (error) => {
      toast({
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: 'destructive'
      });
    }
  });
};
