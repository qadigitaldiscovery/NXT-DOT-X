
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type StatusLog = {
  id: string;
  module_id: string;
  status: 'green' | 'orange' | 'red';
  recorded_at: string;
  note: string | null;
}

export function useStatusLogs(moduleId?: string) {
  const [logs, setLogs] = useState<StatusLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        
        let query = supabase.from('rag_status_logs').select('*');
        
        if (moduleId) {
          query = query.eq('module_id', moduleId);
        }
        
        query = query.order('recorded_at', { ascending: false });
        
        const { data, error } = await query;
        
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
