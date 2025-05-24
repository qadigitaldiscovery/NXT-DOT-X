
import { useState, useEffect } from 'react';

interface KpiIndicator {
  id: string;
  module_name: string;
  kpi_title: string;
  kpi_value: number;
  rag_status: string;
}

export const useKpiIndicators = () => {
  const [kpis, setKpis] = useState<KpiIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock data for KPI indicators
    const mockKpis: KpiIndicator[] = [
      {
        id: '1',
        module_name: 'Data Management',
        kpi_title: 'Processing Speed',
        kpi_value: 95,
        rag_status: 'Green'
      },
      {
        id: '2',
        module_name: 'Trading System',
        kpi_title: 'System Uptime',
        kpi_value: 87,
        rag_status: 'Amber'
      },
      {
        id: '3',
        module_name: 'Loyalty Program',
        kpi_title: 'Member Engagement',
        kpi_value: 72,
        rag_status: 'Red'
      }
    ];

    setTimeout(() => {
      setKpis(mockKpis);
      setLoading(false);
    }, 500);
  }, []);

  return { kpis, loading, error };
};
