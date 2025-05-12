
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Alert = {
  id: string;
  module_id: string;
  title: string;
  message: string;
  severity: string;
  triggered_at: string;
  resolved: boolean;
};

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // For now, we're returning mock data since we haven't created the alerts table yet
    setAlerts([
      {
        id: '1',
        module_id: '1',
        title: 'High CPU Usage',
        message: 'CPU usage exceeded 90% for 5 minutes',
        severity: 'warning',
        triggered_at: new Date().toISOString(),
        resolved: false
      }
    ]);
    setLoading(false);
  }, []);

  const resolveAlert = async (id: string) => {
    // In a real implementation, this would update the database
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
    return { success: true };
  };

  return { alerts, loading, error, resolveAlert };
}
