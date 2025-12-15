
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Supplier } from './types';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');

      if (error) throw error;

      setSuppliers(data.map(item => ({
        ...item,
        status: item.status || 'active'
      })) as Supplier[]);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const refreshSuppliers = async () => {
    await fetchSuppliers();
  };

  const addSupplier = async (supplier: Omit<Supplier, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert([supplier as any])
        .select()
        .single();

      if (error) throw error;

      const newSupplier = {
        ...data,
        status: data.status || 'active'
      } as Supplier;
      
      setSuppliers(prev => [...prev, newSupplier]);
      
      return data;
    } catch (err) {
      console.error('Error adding supplier:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    loading,
    error,
    refreshSuppliers,
    addSupplier
  };
}
