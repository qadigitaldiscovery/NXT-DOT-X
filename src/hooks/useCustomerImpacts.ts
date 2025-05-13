
import { useState, useEffect } from 'react';

export type CustomerImpact = {
  id: string;
  module_id: string;
  description: string;
  affected_count: number;
  severity: 'low' | 'medium' | 'high';
  created_at: string;
  resolved: boolean;
  impact_level?: string;      // Added this property
  recorded_at: string;        // Added this property
  region?: string;            // Added this property
  affected_users?: number;    // Added this property
};

export function useCustomerImpacts(moduleId?: string) {
  const [impacts, setImpacts] = useState<CustomerImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If no moduleId is provided, don't fetch
    if (!moduleId) {
      setImpacts([]);
      setLoading(false);
      return;
    }

    // For now, we're returning mock data
    const mockImpacts: CustomerImpact[] = [
      {
        id: '1',
        module_id: moduleId,
        description: 'Unable to complete checkout process',
        affected_count: 157,
        severity: 'high',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        resolved: false,
        impact_level: 'high',
        recorded_at: new Date(Date.now() - 7200000).toISOString(),
        region: 'North America',
        affected_users: 157
      },
      {
        id: '2',
        module_id: moduleId,
        description: 'Slow page loading times',
        affected_count: 423,
        severity: 'medium',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        resolved: true,
        impact_level: 'medium',
        recorded_at: new Date(Date.now() - 86400000).toISOString(),
        region: 'Europe',
        affected_users: 423
      }
    ];
    
    setImpacts(mockImpacts);
    setLoading(false);
  }, [moduleId]);

  return { impacts, loading, error };
}
