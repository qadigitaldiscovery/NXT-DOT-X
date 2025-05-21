import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useCreateSupplier() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (supplier) => {
            const { data, error } = await supabase
                .from('suppliers')
                .insert(supplier)
                .select()
                .single();
            if (error) {
                console.error('Error creating supplier:', error);
                toast.error('Failed to create supplier');
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            toast.success('Supplier created successfully');
        }
    });
}
