
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Module = {
  id: string;
  name: string;
  status: 'green' | 'orange' | 'red';
  description: string | null;
  created_at: string;
}

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        // Use type assertion to fix the table name issue
        const { data, error } = await supabase.from('modules' as any).select('*');
        if (error) throw error;
        setModules((data || []) as unknown as Module[]);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const updateModuleStatus = async (id: string, status: 'green' | 'orange' | 'red', note?: string) => {
    try {
      // Update the module status with type assertion
      const { error: updateError } = await supabase
        .from('modules' as any)
        .update({ status } as any)
        .eq('id', id);
      
      if (updateError) throw updateError;

      // Log the status change with type assertion
      const { error: logError } = await supabase
        .from('rag_status_logs' as any)
        .insert({
          module_id: id,
          status,
          note: note || `Status changed to ${status}`
        } as any);

      if (logError) throw logError;

      // Refresh the modules with type assertion
      const { data, error } = await supabase.from('modules' as any).select('*');
      if (error) throw error;
      setModules((data || []) as unknown as Module[]);
      
      return { success: true };
    } catch (err) {
      console.error('Error updating module status:', err);
      return { success: false, error: err };
    }
  };

  return { modules, loading, error, updateModuleStatus };
}
