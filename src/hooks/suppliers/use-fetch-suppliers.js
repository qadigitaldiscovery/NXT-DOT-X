import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useSuppliers() {
    return useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('suppliers')
                .select('*')
                .order('name');
            if (error) {
                console.error('Error fetching suppliers:', error);
                toast.error('Failed to load suppliers');
                throw error;
            }
            return data;
        }
    });
}
export function useSupplier(id) {
    return useQuery({
        queryKey: ['suppliers', id],
        queryFn: async () => {
            if (!id)
                return null;
            const { data, error } = await supabase
                .from('suppliers')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(`Error fetching supplier ${id}:`, error);
                toast.error('Failed to load supplier details');
                throw error;
            }
            return data;
        },
        enabled: !!id
    });
}
