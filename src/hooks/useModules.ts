
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Feature {
  name: string;
  path: string;
  description?: string;
}

export interface Module {
  id: string;
  name: string;
  status: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  path?: string;
  features?: Feature[];
}

export const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchModules = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      // Add mock features for data management module
      const enhancedData = data?.map(item => ({
        id: item.id,
        name: item.name,
        status: item.status,
        description: item.description || undefined,
        created_at: item.created_at || undefined,
        updated_at: item.updated_at || undefined,
        path: item.id === 'data-management' ? '/data-management' : undefined,
        features: item.id === 'data-management' ? [
          { name: 'Cost Analysis', path: '/data-management/cost-analysis' },
          { name: 'Supplier Costing', path: '/data-management/supplier-costing' },
          { name: 'Documents', path: '/data-management/documents' },
          { name: 'Price Management', path: '/data-management/pricing' }
        ] : undefined
      })) || [];
      
      setModules(enhancedData);
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError(err instanceof Error ? err : new Error('Unknown error fetching modules'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const updateModuleStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('modules')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      setModules(prevModules =>
        prevModules.map(module =>
          module.id === id ? { ...module, status } : module
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error('Error updating module status:', err);
      return { success: false, error: err instanceof Error ? err : new Error('Unknown error updating module status') };
    }
  };

  const refreshModules = useCallback(async () => {
    await fetchModules();
    return { success: true };
  }, [fetchModules]);

  return { modules, loading, error, isLoading: loading, updateModuleStatus, refreshModules };
};
