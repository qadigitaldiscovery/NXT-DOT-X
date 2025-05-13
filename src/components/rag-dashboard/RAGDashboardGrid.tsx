
import React from 'react';
import KpiCard from './KpiCard';
import { useKpiIndicators } from '@/hooks/useKpiIndicators';

interface RAGDashboardGridProps {
  className?: string;
}

const RAGDashboardGrid: React.FC<RAGDashboardGridProps> = ({ className }) => {
  const { kpis, loading, error } = useKpiIndicators();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4h2V9H9z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading KPI indicators
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Group KPIs by module_name
  const kpisByModule = kpis.reduce((acc, kpi) => {
    if (!acc[kpi.module_name]) {
      acc[kpi.module_name] = [];
    }
    acc[kpi.module_name].push(kpi);
    return acc;
  }, {} as Record<string, typeof kpis>);

  return (
    <div className={className}>
      {Object.entries(kpisByModule).map(([moduleName, moduleKpis]) => (
        <div key={moduleName} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{moduleName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {moduleKpis.map((kpi) => (
              <KpiCard
                key={kpi.id}
                title={kpi.kpi_title}
                value={kpi.kpi_value}
                status={kpi.rag_status as 'Red' | 'Amber' | 'Green'}
              />
            ))}
          </div>
        </div>
      ))}
      
      {kpis.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No KPI indicators found. Please add some data to the kpi_indicators table.
        </div>
      )}
    </div>
  );
};

export default RAGDashboardGrid;
