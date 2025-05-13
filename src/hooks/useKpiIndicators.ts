
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface KpiIndicator {
  id: string;
  module_name: string;
  kpi_title: string;
  kpi_value: number;
  rag_status: 'Red' | 'Amber' | 'Green';
  updated_at: string;
}

export const useKpiIndicators = () => {
  const [kpis, setKpis] = useState<KpiIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchKpis = useCallback(async () => {
    try {
      setLoading(true);
      // Using any type here since the table might not exist yet
      const { data, error } = await supabase
        .from('kpi_indicators')
        .select('*')
        .order('module_name', { ascending: true }) as any;

      if (error) throw error;
      
      // Explicitly cast the data to our KpiIndicator type to ensure type safety
      setKpis(data as KpiIndicator[] || []);
    } catch (err) {
      console.error('Error fetching KPI indicators:', err);
      setError(err instanceof Error ? err : new Error('Unknown error fetching KPIs'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  const refreshKpis = useCallback(async () => {
    await fetchKpis();
    return { success: true };
  }, [fetchKpis]);

  return { kpis, loading, error, refreshKpis };
};
