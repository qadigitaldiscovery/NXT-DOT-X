import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/toast';
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
      
      try {
        // Use a different path for holding bucket files
        const filePath = isHoldingBucket 
          ? `uploads/holding/${Date.now()}-${file.name}`
          : `uploads/${uploadData.supplier_id}/${Date.now()}-${file.name}`;
        
        // Step 1: Create storage bucket if it doesn't exist
        const { data: buckets } = await supabase.storage.listBuckets();
        if (!buckets?.find(bucket => bucket.name === 'supplier-price-lists')) {
          console.log('Creating supplier-price-lists bucket');
          // If bucket doesn't exist, we can't create it from client side due to permissions
          // We'll attempt the file upload anyway
        }
        
        // Step 2: Upload file to storage
        const { error: storageError, data: storageData } = await supabase.storage
          .from('supplier-price-lists')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (storageError) {
          console.error('Error uploading file:', storageError);
          throw storageError;
        }
        
        // Step 3: Create database record
        const { data, error: dbError } = await supabase
          .from('supplier_cost_uploads')
          .insert({
            supplier_id: isHoldingBucket ? null : uploadData.supplier_id,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type || file.name.split('.').pop() || 'unknown',
            file_size: file.size,
            source: uploadData.source,
            // for_allocation column doesn't exist in the table
            // We won't include it in the insert
          } as any)  // Use type assertion to handle the nullable field
          .select()
          .single();
        
        if (dbError) {
          console.error('Error creating upload record:', dbError);
          throw dbError;
        }
        
        return data as unknown as SupplierUpload;
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      toast.default({
        title: "Success",
        description: 'File uploaded successfully'
      });
    },
    onError: (error) => {
      console.error('Error in upload mutation:', error);
      toast.error({
        title: "Error",
        description: `Upload failed: ${error.message || 'Unknown error'}`
      });
    }
  });
}
