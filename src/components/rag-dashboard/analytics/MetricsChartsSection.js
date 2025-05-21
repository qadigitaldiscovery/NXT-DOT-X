import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedLineChart from '@/components/rag-dashboard/EnhancedLineChart';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// Export as a named constant to match import in RAGDashboardPage
export const MetricsChartsSection = ({ metrics = [], metricsLoading = false, formatTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString(), chartTheme = 'dark' }) => {
    return (_jsxs(Tabs, { defaultValue: "line", className: "bg-card/30 backdrop-blur rounded-lg p-4 border border-border/30", children: [_jsx("div", { className: "flex justify-between items-center mb-6", children: _jsxs(TabsList, { className: "bg-background/50", children: [_jsx(TabsTrigger, { value: "line", children: "Line" }), _jsx(TabsTrigger, { value: "area", children: "Area" }), _jsx(TabsTrigger, { value: "bar", children: "Bar" })] }) }), _jsx(TabsContent, { value: "line", className: "space-y-6", children: metricsLoading ? (_jsx("div", { className: "text-center py-12", children: "Loading metrics data..." })) : metrics.map(metric => {
                    // Calculate threshold values based on metric type
                    let threshold = undefined;
                    if (metric.name === 'CPU Usage')
                        threshold = 80;
                    if (metric.name === 'Memory Usage')
                        threshold = 1400;
                    if (metric.name === 'Response Time')
                        threshold = 200;
                    if (metric.name === 'Error Rate')
                        threshold = 3;
                    return (_jsxs(Card, { className: "overflow-hidden bg-card/50 backdrop-blur border-border/50", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg", children: metric.name }), _jsxs(CardDescription, { children: ["Measured in ", metric.unit] })] }), _jsx(CardContent, { children: _jsx(EnhancedLineChart, { data: metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) })), dataKey: "value", xAxisKey: "formattedTime", name: metric.name, unit: metric.unit, color: "#6366f1", threshold: threshold }) })] }, metric.id));
                }) }), _jsx(TabsContent, { value: "area", className: "space-y-6", children: metricsLoading ? (_jsx("div", { className: "text-center py-12", children: "Loading metrics data..." })) : metrics.map(metric => (_jsxs(Card, { className: "overflow-hidden bg-card/50 backdrop-blur border-border/50", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg", children: metric.name }), _jsxs(CardDescription, { children: ["Measured in ", metric.unit] })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) })), children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.1 }), _jsx(XAxis, { dataKey: "formattedTime", tick: { fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }, axisLine: { stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 } }), _jsx(YAxis, { tick: { fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }, axisLine: { stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 } }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: chartTheme === 'dark' ? 'rgba(0,0,0,0.85)' : '#fff',
                                                border: chartTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
                                                borderRadius: '4px',
                                                color: chartTheme === 'dark' ? '#fff' : '#000'
                                            }, formatter: (value) => [`${value} ${metric.unit}`, metric.name] }), _jsx(Legend, {}), _jsx(Area, { type: "monotone", dataKey: "value", stroke: "#6366f1", fill: "#6366f1", fillOpacity: 0.2, name: `${metric.name}` })] }) }) })] }, metric.id))) }), _jsx(TabsContent, { value: "bar", className: "space-y-6", children: metricsLoading ? (_jsx("div", { className: "text-center py-12", children: "Loading metrics data..." })) : metrics.map(metric => (_jsxs(Card, { className: "overflow-hidden bg-card/50 backdrop-blur border-border/50", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg", children: metric.name }), _jsxs(CardDescription, { children: ["Measured in ", metric.unit] })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) })), children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.1 }), _jsx(XAxis, { dataKey: "formattedTime", tick: { fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }, axisLine: { stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 } }), _jsx(YAxis, { tick: { fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }, axisLine: { stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 } }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: chartTheme === 'dark' ? 'rgba(0,0,0,0.85)' : '#fff',
                                                border: chartTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
                                                borderRadius: '4px',
                                                color: chartTheme === 'dark' ? '#fff' : '#000'
                                            }, formatter: (value) => [`${value} ${metric.unit}`, metric.name] }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "value", fill: "#6366f1", name: `${metric.name}`, radius: [4, 4, 0, 0] })] }) }) })] }, metric.id))) })] }));
};
// Keep default export for backward compatibility
export default MetricsChartsSection;
