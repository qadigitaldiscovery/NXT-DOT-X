
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
        title: 'Upload Assigned',
        description: `File ${result.fileName} has been successfully assigned to a supplier.`
      });
    },
    onError: (error) => {
      toast({
        title: 'Assignment Failed',
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: 'destructive'
      });
    }
  });
};
