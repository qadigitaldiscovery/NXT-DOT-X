import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export const CostTrendChart = ({ data, title, description }) => {
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: title }), description && _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-[350px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: data, margin: { top: 5, right: 30, left: 20, bottom: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, {}), _jsx(Tooltip, { formatter: (value) => `$${value}` }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "cost", stroke: "#8884d8", activeDot: { r: 8 }, name: "Current Year" }), data.some(d => d.previousYearCost !== undefined) && (_jsx(Line, { type: "monotone", dataKey: "previousYearCost", stroke: "#82ca9d", name: "Previous Year" }))] }) }) }) })] }));
};
export default CostTrendChart;
