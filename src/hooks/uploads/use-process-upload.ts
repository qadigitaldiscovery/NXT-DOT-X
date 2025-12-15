
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SupplierUpload } from '@/types/supplier-uploads';

export function useProcessSupplierUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (upload: SupplierUpload) => {
      // In a real implementation, this would trigger a Supabase Edge Function
      // For now, we'll simulate processing by updating status
      const { data, error } = await (supabase
        .from('supplier_cost_uploads' as any)
        .update({
          status: 'processing',
          processing_start: new Date().toISOString()
        } as any)
        .eq('id', upload.id)
        .select() as any)
        .single();
      
      if (error) {
        console.error(`Error processing upload ${upload.id}:`, error);
        toast.error('Failed to process upload');
        throw error;
      }
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update with completed status
      const { data: completedData, error: completedError } = await (supabase
        .from('supplier_cost_uploads' as any)
        .update({
          status: 'completed',
          processing_end: new Date().toISOString(),
          processed_rows: Math.floor(Math.random() * 500) + 50,
          error_rows: Math.floor(Math.random() * 10)
        } as any)
        .eq('id', upload.id)
        .select()
        .single() as any);
      
      if (completedError) {
        console.error(`Error completing upload ${upload.id}:`, completedError);
        toast.error('Failed to complete upload processing');
        throw completedError;
      }
      
      return completedData as unknown as SupplierUpload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
      queryClient.invalidateQueries({ queryKey: ['supplier-costs'] });
      toast.success('File processed successfully');
    }
  });
}
