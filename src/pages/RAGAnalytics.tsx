import React, { useState, useMemo } from 'react';
import { useModules } from '@/hooks/useModules';
import { useModuleMetrics, useSystemHealthScore } from '@/hooks/useModuleMetrics';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { NavCategory } from '@/components/layout/sidebar/types';
import { BarChart3, LineChart as LineChartIcon, AlertTriangle, Settings } from 'lucide-react';
import { format } from 'date-fns';

// Import the components with correct export types
import DashboardHeader from '@/components/rag-dashboard/analytics/DashboardHeader';
import StatisticsSection from '@/components/rag-dashboard/analytics/StatisticsSection';
import SystemHealthSection from '@/components/rag-dashboard/analytics/SystemHealthSection';
import MetricsChartsSection from '@/components/rag-dashboard/analytics/MetricsChartsSection';

const RAGAnalytics: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [chartTheme, setChartTheme] = useState<'light' | 'dark'>('dark');
  
  const { modules, loading: modulesLoading } = useModules();
  const { metrics, loading: metricsLoading } = useModuleMetrics(selectedModule, timeRange);
  const { score: healthScore, trend: healthTrend, loading: healthLoading } = useSystemHealthScore();

  // Define navigation categories for this module
  const navCategories: NavCategory[] = [
    {
      name: "RAG Dashboard",
      items: [
        { label: "Overview", path: "/dashboard/rag", icon: BarChart3 },
        { label: "Analytics", path: "/dashboard/rag/analytics", icon: LineChartIcon },
        { label: "Alerts", path: "/dashboard/rag/alerts", icon: AlertTriangle },
        { label: "Settings", path: "/dashboard/rag/settings", icon: Settings, roles: ["admin"] }
      ]
    }
  ];

  // Formatter function for timestamps
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    if (timeRange === 'day') {
      return format(date, 'HH:mm');
    } else {
      return format(date, 'MMM dd');
    }
  };

  // Calculate module status counts for the pie chart
  const getModuleStatusCounts = useMemo(() => {
    return {
      operational: modules.filter(m => m.status === 'green').length,
      degraded: modules.filter(m => m.status === 'orange').length,
      outage: modules.filter(m => m.status === 'red').length
    };
  }, [modules]);

  // Colors for the pie chart
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  // Prepare data for the pie chart
  const pieData = useMemo(() => [
    { name: 'Operational', value: getModuleStatusCounts.operational, color: COLORS[0] },
    { name: 'Degraded', value: getModuleStatusCounts.degraded, color: COLORS[1] },
    { name: 'Outage', value: getModuleStatusCounts.outage, color: COLORS[2] }
  ], [getModuleStatusCounts]);

  // Calculate average response time
  const avgResponseTime = useMemo(() => {
    const responseTimeMetric = metrics.find(metric => metric.name === 'Response Time');
    if (!responseTimeMetric) return null;
    
    const sum = responseTimeMetric.data.reduce((acc, item) => acc + item.value, 0);
    return responseTimeMetric.data.length > 0 ? Math.round(sum / responseTimeMetric.data.length) : null;
  }, [metrics]);

  // Calculate error rate
  const errorRate = useMemo(() => {
    const errorRateMetric = metrics.find(metric => metric.name === 'Error Rate');
    if (!errorRateMetric) return null;
    
    return errorRateMetric.data[errorRateMetric.data.length - 1]?.value || 0;
  }, [metrics]);

  return (
    <SharedDashboardLayout
      moduleTitle="RAG Analytics"
      navCategories={navCategories}
      sidebarClassName="bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
      removeBottomToggle={true}
      showTopLeftToggle={true}
    >
      <div className="container mx-auto py-6 max-w-7xl">
        {/* Dashboard Header with Controls */}
        <DashboardHeader
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          chartTheme={chartTheme}
          setChartTheme={setChartTheme}
          modules={modules}
        />

        {/* Statistics Cards Section */}
        <StatisticsSection
          healthScore={healthScore}
          healthTrend={healthTrend}
          avgResponseTime={avgResponseTime}
          modulesCount={modules.length}
          operationalCount={getModuleStatusCounts.operational}
          errorRate={errorRate}
          healthLoading={healthLoading}
        />
        
        {/* System Health and Status Distribution Section */}
        <SystemHealthSection
          healthScore={healthScore}
          healthLoading={healthLoading}
          pieData={pieData}
          chartTheme={chartTheme}
        />
        
        {/* Metrics Charts Section */}
        <MetricsChartsSection
          metrics={metrics}
          metricsLoading={metricsLoading}
          formatTimestamp={formatTimestamp}
          chartTheme={chartTheme}
        />
      </div>
    </SharedDashboardLayout>
  );
};

export default RAGAnalytics;
