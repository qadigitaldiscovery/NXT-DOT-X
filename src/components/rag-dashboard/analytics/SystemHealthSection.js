import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import StatusGauge from '@/components/rag-dashboard/StatusGauge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// Export as a named constant to match import in RAGDashboardPage
export const SystemHealthSection = ({ healthScore, healthLoading, pieData, chartTheme }) => {
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs(Card, { className: "md:col-span-1 bg-card/50 backdrop-blur border-border/50", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "System Health Score" }), _jsx(CardDescription, { children: "Overall system health assessment" })] }), _jsx(CardContent, { className: "flex items-center justify-center py-6", children: healthLoading ? (_jsx("div", { className: "text-center", children: "Loading..." })) : (_jsx("div", { className: "flex flex-col items-center", children: _jsx(StatusGauge, { status: healthScore >= 90 ? 'green' : healthScore >= 70 ? 'orange' : 'red', size: "lg", showLabel: true }) })) })] }), _jsxs(Card, { className: "md:col-span-2 bg-card/50 backdrop-blur border-border/50", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "Status Distribution" }), _jsx(CardDescription, { children: "Current status of all modules" })] }), _jsx(CardContent, { className: "h-[300px] flex items-center justify-center", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 100, fill: "#8884d8", dataKey: "value", label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, children: pieData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                                            backgroundColor: chartTheme === 'dark' ? 'rgba(0,0,0,0.85)' : '#fff',
                                            border: chartTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
                                            borderRadius: '4px',
                                            color: chartTheme === 'dark' ? '#fff' : '#000'
                                        }, formatter: (value) => [`${value} module${value !== 1 ? 's' : ''}`] })] }) }) })] })] }));
};
// Keep default export for backward compatibility
export default SystemHealthSection;
