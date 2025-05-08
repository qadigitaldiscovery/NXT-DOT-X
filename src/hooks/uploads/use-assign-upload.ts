
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SupplierUpload } from '@/types/supplier-uploads';

export function useAssignUploadToSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ uploadId, supplierId }: { uploadId: string, supplierId: string }) => {
      // First fetch the original upload to get the file path
      const { data: upload, error: fetchError } = await supabase
        .from('supplier_cost_uploads')
        .select('file_path, file_name, for_allocation')
        .eq('id', uploadId)
        .single();
      
      if (fetchError) {
        console.error('Error fetching upload:', fetchError);
        toast.error('Failed to assign upload to supplier');
        throw fetchError;
      }
      
      // Create a new path for the file
      const oldPath = upload.file_path;
      const newPath = `uploads/${supplierId}/${Date.now()}-${upload.file_name}`;
      
      // Copy the file to the new location
      const { error: copyError } = await supabase.storage
        .from('supplier-price-lists')
        .copy(oldPath, newPath);
      
      if (copyError) {
        console.error('Error copying file:', copyError);
        toast.error('Failed to assign upload to supplier');
        throw copyError;
      }
      
      // Update the database record
      const { data: updatedUpload, error: updateError } = await supabase
        .from('supplier_cost_uploads')
        .update({
          supplier_id: supplierId,
          file_path: newPath,
          for_allocation: false
        })
        .eq('id', uploadId)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating upload record:', updateError);
        toast.error('Failed to assign upload to supplier');
        throw updateError;
      }
      
      return updatedUpload as unknown as SupplierUpload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      toast.success('Upload successfully assigned to supplier');
    }
  });
}
