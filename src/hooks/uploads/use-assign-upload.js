import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
export const useAssignUploadToSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ uploadId, supplierId }) => {
            // Update the supplier_cost_uploads table
            const { data, error } = await supabase
                .from('supplier_cost_uploads')
                .update({
                supplier_id: supplierId,
                for_allocation: false
            })
                .eq('id', uploadId)
                .select('file_path, file_name');
            if (error)
                throw error;
            if (!data || data.length === 0) {
                throw new Error('No data returned after update');
            }
            return { filePath: data[0].file_path, fileName: data[0].file_name };
        },
        onSuccess: (result, variables) => {
            queryClient.invalidateQueries({ queryKey: ['supplier-uploads'] });
            toast(`File ${result.fileName} has been successfully assigned to a supplier.`);
        },
        onError: (error) => {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        }
    });
};
