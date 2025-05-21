import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import StatisticCard from '@/components/rag-dashboard/StatisticCard';
import { Activity, Clock, Cpu, AlertOctagon } from 'lucide-react';
// Export as a named constant to match import in RAGDashboardPage
export const StatisticsSection = ({ healthScore, healthTrend, avgResponseTime, modulesCount, operationalCount, errorRate, 
// Using optional param syntax to avoid unused variable warning
healthLoading: _healthLoading }) => {
    return (_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsx(StatisticCard, { value: healthScore + "%", label: "System Health", valueColor: healthScore >= 90 ? 'success' : healthScore >= 70 ? 'warning' : 'danger', trend: healthTrend, trendValue: healthTrend === 'up' ? 'Improving' : healthTrend === 'down' ? 'Declining' : 'Stable', icon: _jsx(Activity, { className: "h-4 w-4" }) }), _jsx(StatisticCard, { value: avgResponseTime !== null ? `${avgResponseTime} ms` : 'N/A', label: "Average Response Time", valueColor: avgResponseTime && avgResponseTime < 100 ? 'success' : avgResponseTime && avgResponseTime < 200 ? 'warning' : 'danger', icon: _jsx(Clock, { className: "h-4 w-4" }) }), _jsx(StatisticCard, { value: modulesCount, label: "Total Modules", trendValue: `${operationalCount} operational`, icon: _jsx(Cpu, { className: "h-4 w-4" }) }), _jsx(StatisticCard, { value: errorRate !== null ? errorRate : 'N/A', label: "Current Error Rate", valueColor: errorRate === 0 ? 'success' : errorRate && errorRate < 2 ? 'warning' : 'danger', trendValue: "errors/min", icon: _jsx(AlertOctagon, { className: "h-4 w-4" }) })] }));
};
// Keep default export for backward compatibility
export default StatisticsSection;
