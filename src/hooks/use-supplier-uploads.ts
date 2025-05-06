
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type SupplierUpload = {
  id: string;
  supplier_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  source: 'direct' | 'email' | 'api' | 'sftp';
  processing_notes: any | null;
  processed_rows: number;
  error_rows: number;
  processing_start: string | null;
  processing_end: string | null;
  created_at: string;
  // Joined fields
  supplier_name?: string;
};

export function useSupplierUploads(supplierId?: string) {
  return useQuery({
    queryKey: ['supplier-uploads', supplierId],
    queryFn: async () => {
      let query = supabase
        .from('supplier_cost_uploads')
        .select(`
          *,
          suppliers:supplier_id (name)
        `);

      if (supplierId) {
        query = query.eq('supplier_id', supplierId);
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
        supplier_name: item.suppliers?.name || 'Unknown Supplier',
        suppliers: undefined
      }));
      
      return transformedData as SupplierUpload[];
    }
  });
}

export function useCreateSupplierUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (upload: { 
      supplier_id: string; 
      file: File;
      source: 'direct' | 'email' | 'api' | 'sftp';
    }) => {
      const { file, ...uploadData } = upload;
      const filePath = `uploads/${uploadData.supplier_id}/${Date.now()}-${file.name}`;
      
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
          supplier_id: uploadData.supplier_id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type || file.name.split('.').pop() || 'unknown',
          file_size: file.size,
          source: uploadData.source
        })
        .select()
        .single();
      
      if (dbError) {
        console.error('Error creating upload record:', dbError);
        toast.error('Failed to process upload');
        throw dbError;
      }
      
      return data as SupplierUpload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      toast.success('File uploaded successfully and is being processed');
    }
  });
}

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

export function useProcessSupplierUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (upload: SupplierUpload) => {
      // In a real implementation, this would trigger a Supabase Edge Function
      // For now, we'll simulate processing by updating status
      const { data, error } = await supabase
        .from('supplier_cost_uploads')
        .update({
          status: 'processing',
          processing_start: new Date().toISOString()
        })
        .eq('id', upload.id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error processing upload ${upload.id}:`, error);
        toast.error('Failed to process upload');
        throw error;
      }
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update with completed status
      const { data: completedData, error: completedError } = await supabase
        .from('supplier_cost_uploads')
        .update({
          status: 'completed',
          processing_end: new Date().toISOString(),
          processed_rows: Math.floor(Math.random() * 500) + 50,
          error_rows: Math.floor(Math.random() * 10)
        })
        .eq('id', upload.id)
        .select()
        .single();
      
      if (completedError) {
        console.error(`Error completing upload ${upload.id}:`, completedError);
        toast.error('Failed to complete upload processing');
        throw completedError;
      }
      
      return completedData as SupplierUpload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      queryClient.invalidateQueries({ queryKey: ['supplier-costs'] });
      toast.success('File processed successfully');
    }
  });
}
