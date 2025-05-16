
import { useState, useCallback, useEffect } from 'react';

export interface CustomerImpact {
  id: string;
  module_id: string;
  impact_level: 'low' | 'medium' | 'high' | 'critical';
  affected_customers: number;
  description: string;
  created_at: string;
  resolved_at: string | null;
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
          impact_level: 'medium',
          affected_customers: 120,
          description: 'Customers experiencing intermittent login issues',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          resolved_at: null
        },
        {
          id: '2',
          module_id: 'module-2',
          impact_level: 'high',
          affected_customers: 500,
          description: 'Order processing delays of up to 1 hour',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          resolved_at: null
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

  return {
    impacts,
    loading,
    error,
    fetchImpacts
  };
};
