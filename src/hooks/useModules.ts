import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Module {
  id: string;
  name: string;
  status: string;
  description: string | null | undefined; // Allow null values from the database
  created_at: string | null;
  updated_at: string | null;
}

export const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // We need to cast the data to Module[] to ensure TypeScript compatibility
      // As null and undefined are both allowed in the Module interface
      setModules(data as Module[]);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const refreshModules = async () => {
    try {
      await fetchModules();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return {
    modules,
    loading,
    error,
    refreshModules
  };
};
