
import { useState, useEffect } from 'react';

export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  contact_name?: string;
  website?: string;
  payment_terms?: string;
  status: string;
  created_at: string;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock data
    const mockSuppliers: Supplier[] = [
      {
        id: '1',
        name: 'Supplier One',
        code: 'SUP001',
        email: 'supplier1@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        contact_name: 'John Doe',
        website: 'https://supplier1.com',
        payment_terms: 'Net 30',
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];
    
    setSuppliers(mockSuppliers);
    setLoading(false);
  }, []);

  return {
    data: suppliers,
    isLoading: loading,
    error
  };
};

export const useSupplier = (id?: string) => {
  const { data: suppliers, isLoading, error } = useSuppliers();
  
  const supplier = suppliers.find(s => s.id === id);
  
  return {
    data: supplier,
    isLoading,
    error
  };
};

export const useCreateSupplier = () => {
  return {
    mutate: (data: Omit<Supplier, 'id'>) => {
      console.log('Creating supplier:', data);
    },
    isPending: false
  };
};

export const useDeleteSupplier = () => {
  return {
    mutate: (id: string, options?: { onSuccess?: () => void }) => {
      console.log('Deleting supplier:', id);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    isPending: false
  };
};
