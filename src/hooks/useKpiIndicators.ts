
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('kpi_indicators')
          .select('*')
          .order('module_name', { ascending: true });

        if (error) throw error;

        setKpis(data || []);
      } catch (err) {
        console.error('Error fetching KPI indicators:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching KPIs'));
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  return { kpis, loading, error };
};
