import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useUpdateSupplier() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...supplier }) => {
            const { data, error } = await supabase
                .from('suppliers')
                .update(supplier)
                .eq('id', id)
                .select()
                .single();
            if (error) {
                console.error(`Error updating supplier ${id}:`, error);
                toast.error('Failed to update supplier');
                throw error;
            }
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            queryClient.invalidateQueries({ queryKey: ['suppliers', data.id] });
            toast.success('Supplier updated successfully');
        }
    });
}
