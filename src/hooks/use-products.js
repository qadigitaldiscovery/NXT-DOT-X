import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('name');
            if (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
                throw error;
            }
            return data;
        }
    });
}
export function useProduct(id) {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            if (!id)
                return null;
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(`Error fetching product ${id}:`, error);
                toast.error('Failed to load product details');
                throw error;
            }
            return data;
        },
        enabled: !!id
    });
}
export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            const { data, error } = await supabase
                .from('products')
                .insert(product)
                .select()
                .single();
            if (error) {
                console.error('Error creating product:', error);
                toast.error('Failed to create product');
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product created successfully');
        }
    });
}
export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...product }) => {
            const { data, error } = await supabase
                .from('products')
                .update(product)
                .eq('id', id)
                .select()
                .single();
            if (error) {
                console.error(`Error updating product ${id}:`, error);
                toast.error('Failed to update product');
                throw error;
            }
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['products', data.id] });
            toast.success('Product updated successfully');
        }
    });
}
export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);
            if (error) {
                console.error(`Error deleting product ${id}:`, error);
                toast.error('Failed to delete product');
                throw error;
            }
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully');
        }
    });
}
