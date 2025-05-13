
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Alert = {
  id: string;
  module_id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  resolved: boolean;
  resolved_at: string | null;
};

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // For now, we're returning mock data since we haven't created the alerts table yet
    const mockAlerts: Alert[] = [
      {
        id: '1',
        module_id: '1',
        title: 'High CPU Usage',
        description: 'CPU usage exceeded 90% for more than 5 minutes',
        severity: 'high',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        resolved: false,
        resolved_at: null
      },
      {
        id: '2',
        module_id: '3',
        title: 'Service Unavailable',
        description: 'Service has been unreachable for 10 minutes',
        severity: 'critical',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        resolved: false,
        resolved_at: null
      },
      {
        id: '3',
        module_id: '2',
        title: 'Memory Leak Detected',
        description: 'Gradual increase in memory usage detected',
        severity: 'medium',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        resolved: true,
        resolved_at: new Date(Date.now() - 43200000).toISOString()
      }
    ];
    
    setAlerts(mockAlerts);
    setLoading(false);
  }, []);

  const resolveAlert = async (id: string) => {
    // In a real implementation, this would update the database
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id 
          ? { ...alert, resolved: true, resolved_at: new Date().toISOString() } 
          : alert
      )
    );
    
    return { success: true, error: null };
  };

  return { alerts, loading, error, resolveAlert };
}
