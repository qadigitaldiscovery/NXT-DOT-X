
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type CustomerImpact = {
  id: string;
  module_id: string;
  region: string | null;
  affected_users: number | null;
  description: string | null;
  impact_level: string | null;
  recorded_at: string;
}

export function useCustomerImpacts(moduleId?: string) {
  const [impacts, setImpacts] = useState<CustomerImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImpacts = async () => {
      try {
        setLoading(true);
        
        let query = supabase.from('customer_impacts').select('*');
        
        if (moduleId) {
          query = query.eq('module_id', moduleId);
        }
        
        query = query.order('recorded_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) throw error;
        setImpacts(data as CustomerImpact[]);
      } catch (err) {
        console.error('Error fetching customer impacts:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchImpacts();
  }, [moduleId]);

  return { impacts, loading, error };
}
