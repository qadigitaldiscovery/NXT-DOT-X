import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useModules } from '@/hooks/useModules';
import { useModuleMetrics, useSystemHealthScore } from '@/hooks/useModuleMetrics';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { BarChart3, LineChart as LineChartIcon, AlertTriangle, Settings } from 'lucide-react';
import { format } from 'date-fns';
// Import the components with correct export types
import DashboardHeader from '@/components/rag-dashboard/analytics/DashboardHeader';
import StatisticsSection from '@/components/rag-dashboard/analytics/StatisticsSection';
import SystemHealthSection from '@/components/rag-dashboard/analytics/SystemHealthSection';
import MetricsChartsSection from '@/components/rag-dashboard/analytics/MetricsChartsSection';
const RAGAnalytics = () => {
    const [selectedModule, setSelectedModule] = useState(undefined);
    const [timeRange, setTimeRange] = useState('week');
    const [chartTheme, setChartTheme] = useState('dark');
    const { modules, loading: modulesLoading } = useModules();
    const { metrics, loading: metricsLoading } = useModuleMetrics(selectedModule, timeRange);
    const { score: healthScore, trend: healthTrend, loading: healthLoading } = useSystemHealthScore();
    // Define navigation categories for the RAG module
    const navCategories = [
        {
            name: "RAG Dashboard",
            label: "RAG Dashboard", // Adding the required label property
            items: [
                { label: "Overview", path: "/dashboard/rag", icon: BarChart3 },
                { label: "Analytics", path: "/dashboard/rag/analytics", icon: LineChartIcon },
                { label: "Alerts", path: "/dashboard/rag/alerts", icon: AlertTriangle },
                { label: "Settings", path: "/dashboard/rag/settings", icon: Settings, roles: ["admin"] }
            ]
        }
    ];
    // Formatter function for timestamps
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        if (timeRange === 'day') {
            return format(date, 'HH:mm');
        }
        else {
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
        if (!responseTimeMetric)
            return null;
        const sum = responseTimeMetric.data.reduce((acc, item) => acc + item.value, 0);
        return responseTimeMetric.data.length > 0 ? Math.round(sum / responseTimeMetric.data.length) : null;
    }, [metrics]);
    // Calculate error rate
    const errorRate = useMemo(() => {
        const errorRateMetric = metrics.find(metric => metric.name === 'Error Rate');
        if (!errorRateMetric)
            return null;
        return errorRateMetric.data[errorRateMetric.data.length - 1]?.value || 0;
    }, [metrics]);
    return (_jsx(SharedDashboardLayout, { moduleTitle: "RAG Analytics", navCategories: navCategories, sidebarClassName: "bg-gradient-to-b from-gray-900 via-gray-800 to-black", removeBottomToggle: true, showTopLeftToggle: true, children: _jsxs("div", { className: "container mx-auto py-6 max-w-7xl", children: [_jsx(DashboardHeader, { selectedModule: selectedModule, setSelectedModule: setSelectedModule, timeRange: timeRange, setTimeRange: setTimeRange, chartTheme: chartTheme, setChartTheme: setChartTheme, modules: modules }), _jsx(StatisticsSection, { healthScore: healthScore, healthTrend: healthTrend, avgResponseTime: avgResponseTime, modulesCount: modules.length, operationalCount: getModuleStatusCounts.operational, errorRate: errorRate, healthLoading: healthLoading }), _jsx(SystemHealthSection, { healthScore: healthScore, healthLoading: healthLoading, pieData: pieData, chartTheme: chartTheme }), _jsx(MetricsChartsSection, { metrics: metrics, metricsLoading: metricsLoading, formatTimestamp: formatTimestamp, chartTheme: chartTheme })] }) }));
};
export default RAGAnalytics;
