
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StatusLog } from './useModules';

export function useStatusLogs(moduleId?: string) {
  const [logs, setLogs] = useState<StatusLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      // If no moduleId is provided, don't fetch
      if (!moduleId) {
        setLogs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch status logs for the specified module
        const { data, error } = await supabase
          .from('rag_status_logs')
          .select('*')
          .eq('module_id', moduleId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setLogs(data as StatusLog[]);
      } catch (err) {
        console.error('Error fetching status logs:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [moduleId]);

  return { logs, loading, error };
}
