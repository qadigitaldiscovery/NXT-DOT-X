
import { useState, useEffect } from 'react';

export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
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
        email: 'supplier1@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];
    
    setSuppliers(mockSuppliers);
    setLoading(false);
  }, []);

  const useCreateSupplier = () => {
    return {
      mutate: (data: Omit<Supplier, 'id'>) => {
        const newSupplier = { ...data, id: Date.now().toString() };
        setSuppliers(prev => [...prev, newSupplier]);
      },
      isPending: false
    };
  };

  return {
    suppliers,
    loading,
    error,
    useCreateSupplier
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
