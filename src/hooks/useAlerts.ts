
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
        
        // Use type assertion for the table name since it exists in the database but not in generated types
        let query = supabase.from('alerts' as any).select('*');
        
        if (moduleId) {
          query = query.eq('module_id', moduleId);
        }
        
        query = query.order('triggered_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Use explicit type assertion to handle the mismatch
        setAlerts((data || []) as unknown as Alert[]);
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
      // Use type assertion to handle the property mismatch
      const { error } = await supabase
        .from('alerts' as any)
        .update({ resolved: true } as any)
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
