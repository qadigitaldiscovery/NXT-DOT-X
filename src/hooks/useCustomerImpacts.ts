
import { useState, useCallback, useEffect } from 'react';

export interface CustomerImpact {
  id: string;
  module_id: string;
  impact_level: string | null;
  affected_users: number | null;
  region: string | null;
  description: string | null;
  recorded_at: string;
}

export const useCustomerImpacts = () => {
  const [impacts, setImpacts] = useState<CustomerImpact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchImpacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for now - in a real app, this would fetch from an API
      const mockImpacts: CustomerImpact[] = [
        {
          id: '1',
          module_id: 'module-1',
          impact_level: 'low',
          affected_users: 250,
          region: 'North America',
          description: 'Slight delay in data processing affecting dashboard updates',
          recorded_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '2',
          module_id: 'module-2',
          impact_level: 'medium',
          affected_users: 1500,
          region: 'Europe',
          description: 'Search functionality intermittently unavailable',
          recorded_at: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '3',
          module_id: 'module-3',
          impact_level: 'high',
          affected_users: 5000,
          region: 'Global',
          description: 'Complete outage of authentication system',
          recorded_at: new Date(Date.now() - 14400000).toISOString()
        }
      ];
      
      setImpacts(mockImpacts);
    } catch (err: any) {
      setError(err);
      console.error('Error fetching customer impacts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImpacts();
  }, [fetchImpacts]);

  const getImpactsByModuleId = useCallback((moduleId: string) => {
    // In a real app, this would be an API call
    // For now, we'll filter the mock data
    return Promise.resolve(
      impacts.filter(impact => impact.module_id === moduleId)
    );
  }, [impacts]);

  return {
    impacts,
    loading,
    error,
    fetchImpacts,
    getImpactsByModuleId
  };
};
