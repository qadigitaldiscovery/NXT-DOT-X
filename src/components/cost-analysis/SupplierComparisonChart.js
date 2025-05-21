import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export const SupplierComparisonChart = ({ data, title, description }) => {
    // Format the data for display
    const chartData = data.map(item => ({
        supplier: item.supplier,
        'Supplier Cost': item.cost,
        'Market Average': item.marketAverage || 0,
    }));
    // Calculate chart dimensions based on data length
    const chartHeight = Math.max(300, data.length * 50);
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: title }), description && _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-[350px]", children: _jsx(ResponsiveContainer, { width: "100%", height: chartHeight, children: _jsxs(BarChart, { layout: "vertical", data: chartData, margin: { top: 20, right: 30, left: 80, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { type: "number" }), _jsx(YAxis, { type: "category", dataKey: "supplier" }), _jsx(Tooltip, { formatter: (value) => `$${value}` }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "Supplier Cost", fill: "#8884d8" }), _jsx(Bar, { dataKey: "Market Average", fill: "#82ca9d" })] }) }) }) })] }));
};
export default SupplierComparisonChart;
