import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type Supplier = {
  id: string;
  name: string;
  code: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  payment_terms: string | null;
  status: string;
};

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
      
      return data as Supplier[];
    }
  });
}

export function useSupplier(id: string | undefined) {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: async () => {
      if (!id) return null;
      
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
      
      return data as Supplier;
    },
    enabled: !!id
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (supplier: Omit<Supplier, 'id'>) => {
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
      
      return data as Supplier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier created successfully');
    }
  });
}

export function useCreateBulkSuppliers() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ csvData }: { csvData: string }) => {
      // Parse CSV data
      const lines = csvData.split('\n');
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Validate required headers
      const requiredHeaders = ['name', 'code'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
      }
      
      // Parse rows and create suppliers
      const suppliers = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Handle quoted values correctly
        const values: string[] = [];
        let inQuotes = false;
        let currentValue = '';
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          
          if (char === '"' && (j === 0 || line[j-1] !== '\\')) {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue.replace(/"/g, '').trim());
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        
        values.push(currentValue.replace(/"/g, '').trim());
        
        // Create supplier object
        const supplier: Record<string, any> = {};
        headers.forEach((header, index) => {
          if (index < values.length) {
            supplier[header] = values[index];
          }
        });
        
        suppliers.push(supplier);
      }
      
      // Insert suppliers
      if (suppliers.length === 0) {
        throw new Error('No valid suppliers found in CSV');
      }
      
      const { data, error } = await supabase
        .from('suppliers')
        .insert(suppliers)
        .select('id');
      
      if (error) {
        console.error('Error creating suppliers:', error);
        throw error;
      }
      
      return { count: suppliers.length, ids: data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...supplier }: Supplier) => {
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
      
      return data as Supplier;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers', data.id] });
      toast.success('Supplier updated successfully');
    }
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting supplier ${id}:`, error);
        toast.error('Failed to delete supplier');
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier deleted successfully');
    }
  });
}
