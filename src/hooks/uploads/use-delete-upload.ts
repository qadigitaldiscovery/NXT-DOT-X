
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SupplierUpload } from '@/types/supplier-uploads';

export function useDeleteSupplierUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (upload: SupplierUpload) => {
      // Step 1: Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('supplier-price-lists')
        .remove([upload.file_path]);
      
      if (storageError) {
        console.error(`Error deleting file for upload ${upload.id}:`, storageError);
        // Continue anyway to delete the database record
      }
      
      // Step 2: Delete database record
      const { error: dbError } = await supabase
        .from('supplier_cost_uploads')
        .delete()
        .eq('id', upload.id);
      
      if (dbError) {
        console.error(`Error deleting upload record ${upload.id}:`, dbError);
        toast.error('Failed to delete upload');
        throw dbError;
      }
      
      return upload.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      toast.success('Upload deleted successfully');
    }
  });
}
