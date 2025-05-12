
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type CustomerImpact = {
  id: string;
  module_id: string;
  description: string;
  impact_level: string | null;
  affected_users: number | null;
  region: string | null;
  recorded_at: string;
};

export function useCustomerImpacts(moduleId?: string) {
  const [impacts, setImpacts] = useState<CustomerImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // For now, we're returning mock data since we haven't created the customer_impacts table yet
    setImpacts([]);
    setLoading(false);
  }, [moduleId]);

  return { impacts, loading, error };
}
