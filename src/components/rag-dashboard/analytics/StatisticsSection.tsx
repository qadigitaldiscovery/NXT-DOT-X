import React from 'react';
import StatisticCard from '@/components/rag-dashboard/StatisticCard';
import { Activity, Clock, Cpu, AlertOctagon } from 'lucide-react';

interface StatisticsSectionProps {
  healthScore: number;
  healthTrend: 'up' | 'down' | 'stable';
  avgResponseTime: number | null;
  modulesCount: number;
  operationalCount: number;
  errorRate: number | null;
  // Keeping healthLoading for future implementation
  healthLoading?: boolean;
}

// Export as a named constant to match import in RAGDashboardPage
export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  healthScore,
  healthTrend,
  avgResponseTime,
  modulesCount,
  operationalCount,
  errorRate,
  // Using optional param syntax to avoid unused variable warning
  healthLoading: _healthLoading
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatisticCard 
        value={healthScore + "%"}
        label="System Health"
        valueColor={healthScore >= 90 ? 'success' : healthScore >= 70 ? 'warning' : 'danger'}
        trend={healthTrend}
        trendValue={healthTrend === 'up' ? 'Improving' : healthTrend === 'down' ? 'Declining' : 'Stable'}
        icon={<Activity className="h-4 w-4" />}
      />
      
      <StatisticCard
        value={avgResponseTime !== null ? `${avgResponseTime} ms` : 'N/A'}
        label="Average Response Time"
        valueColor={avgResponseTime && avgResponseTime < 100 ? 'success' : avgResponseTime && avgResponseTime < 200 ? 'warning' : 'danger'}
        icon={<Clock className="h-4 w-4" />}
      />
      
      <StatisticCard
        value={modulesCount}
        label="Total Modules"
        trendValue={`${operationalCount} operational`}
        icon={<Cpu className="h-4 w-4" />}
      />
      
      <StatisticCard
        value={errorRate !== null ? errorRate : 'N/A'}
        label="Current Error Rate"
        valueColor={errorRate === 0 ? 'success' : errorRate && errorRate < 2 ? 'warning' : 'danger'}
        trendValue="errors/min"
        icon={<AlertOctagon className="h-4 w-4" />}
      />
    </div>
  );
};

// Keep default export for backward compatibility
export default StatisticsSection;
