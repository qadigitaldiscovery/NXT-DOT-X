
import { useState, useEffect, useCallback } from 'react';

export interface CustomerImpact {
  id: string;
  module_id: string;
  impact_type: string;
  description: string;
  affected_users: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  started_at: string;
  resolved_at: string | null;
  created_at: string;
}

export function useCustomerImpacts() {
  const [impacts, setImpacts] = useState<CustomerImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchImpacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for now
      const mockImpacts: CustomerImpact[] = [
        {
          id: '1',
          module_id: '1',
          impact_type: 'service_degradation',
          description: 'Increased response times affecting user experience',
          affected_users: 250,
          severity: 'medium',
          started_at: new Date(Date.now() - 7200000).toISOString(),
          resolved_at: null,
          created_at: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '2',
          module_id: '2',
          impact_type: 'service_unavailable',
          description: 'Complete outage preventing customer access',
          affected_users: 1500,
          severity: 'critical',
          started_at: new Date(Date.now() - 86400000).toISOString(),
          resolved_at: new Date(Date.now() - 82800000).toISOString(),
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      setImpacts(mockImpacts);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImpacts();
  }, [fetchImpacts]);

  const getImpactsByModuleId = useCallback((moduleId: string) => {
    return Promise.resolve(
      impacts.filter(impact => impact.module_id === moduleId)
    );
  }, [impacts]);

  return { impacts, loading, error, getImpactsByModuleId };
}
