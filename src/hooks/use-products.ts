
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Product } from '@/types/product';

// Using a mock implementation for now since the database doesn't have a products table yet
const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'PROD-001',
    name: 'Premium Widget',
    description: 'A high-quality widget for all your needs',
    category: 'Widgets',
    price: 29.99,
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    sku: 'PROD-002',
    name: 'Economy Gadget',
    description: 'An affordable gadget solution',
    category: 'Gadgets',
    price: 19.99,
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Once we have a products table, replace this with actual fetch
      // const { data, error } = await supabase.from('products').select('*');
      
      // if (error) {
      //   throw new Error(error.message);
      // }
      
      // return data as Product[];
      
      // For now, return mock data
      return mockProducts;
    }
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      // Once we have a products table, replace this with actual fetch
      // const { data, error } = await supabase
      //   .from('products')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      
      // if (error) {
      //   throw new Error(error.message);
      // }
      
      // return data as Product;
      
      // For now, return mock data
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    },
    enabled: !!id
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      // Once we have a products table, replace this with actual insertion
      // const { data, error } = await supabase
      //   .from('products')
      //   .insert({
      //     ...product,
      //     created_at: new Date().toISOString(),
      //     updated_at: new Date().toISOString()
      //   })
      //   .select()
      //   .single();
      
      // if (error) {
      //   throw new Error(error.message);
      // }
      
      // return data as Product;
      
      // For now, return a mock product with generated ID
      return {
        ...product,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Product;
    },
    onSuccess: () => {
      toast.success('Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create product: ${error.message}`);
    }
  });
}
