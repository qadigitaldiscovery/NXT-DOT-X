
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SupplierUpload } from '@/types/supplier-uploads';

export function useCreateSupplierUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (upload: { 
      supplier_id: string; 
      file: File;
      source: 'direct' | 'email' | 'api' | 'sftp';
      for_allocation?: boolean;
    }) => {
      const { file, ...uploadData } = upload;
      
      // Handle the case when the file is going to a holding bucket
      const isHoldingBucket = upload.supplier_id === 'holding' || uploadData.for_allocation;
      
      // Use a different path for holding bucket files
      const filePath = isHoldingBucket 
        ? `uploads/holding/${Date.now()}-${file.name}`
        : `uploads/${uploadData.supplier_id}/${Date.now()}-${file.name}`;
      
      // Step 1: Upload file to storage
      const { error: storageError } = await supabase.storage
        .from('supplier-price-lists')
        .upload(filePath, file);
      
      if (storageError) {
        console.error('Error uploading file:', storageError);
        toast.error('Failed to upload file');
        throw storageError;
      }
      
      // Step 2: Create database record
      const { data, error: dbError } = await supabase
        .from('supplier_cost_uploads')
        .insert({
          supplier_id: isHoldingBucket ? null : uploadData.supplier_id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type || file.name.split('.').pop() || 'unknown',
          file_size: file.size,
          source: uploadData.source,
          for_allocation: isHoldingBucket ? true : false
        })
        .select()
        .single();
      
      if (dbError) {
        console.error('Error creating upload record:', dbError);
        toast.error('Failed to process upload');
        throw dbError;
      }
      
      return data as unknown as SupplierUpload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      toast.success('File uploaded successfully and is being processed');
    }
  });
}
