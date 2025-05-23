
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Module {
  id: string;
  name: string;
  status: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
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
      
      // Properly map the data with correct types
      setModules(data?.map(item => ({
        id: item.id,
        name: item.name,
        status: item.status,
        description: item.description || undefined,
        created_at: item.created_at || undefined,
        updated_at: item.updated_at || undefined
      })) || []);
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
      
      // Update local state
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
