
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Alert = {
  id: string;
  module_id: string;
  title: string;
  severity: 'info' | 'warning' | 'destructive';
  resolved: boolean;
  triggered_at: string;
}

export function useAlerts(moduleId?: string) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        
        let query = supabase.from('alerts').select('*');
        
        if (moduleId) {
          query = query.eq('module_id', moduleId);
        }
        
        query = query.order('triggered_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) throw error;
        setAlerts(data as Alert[]);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [moduleId]);

  const resolveAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ resolved: true })
        .eq('id', id);
      
      if (error) throw error;
      
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === id ? { ...alert, resolved: true } : alert
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error('Error resolving alert:', err);
      return { success: false, error: err };
    }
  };

  return { alerts, loading, error, resolveAlert };
}
