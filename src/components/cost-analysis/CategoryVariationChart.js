import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
export const CategoryVariationChart = ({ data, title, description }) => {
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: title }), description && _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-[350px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(RadarChart, { cx: "50%", cy: "50%", outerRadius: "80%", data: data, children: [_jsx(PolarGrid, {}), _jsx(PolarAngleAxis, { dataKey: "category" }), _jsx(PolarRadiusAxis, {}), _jsx(Radar, { name: "Actual", dataKey: "value", stroke: "#8884d8", fill: "#8884d8", fillOpacity: 0.6 }), data.some(d => d.average !== undefined) && (_jsx(Radar, { name: "Average", dataKey: "average", stroke: "#82ca9d", fill: "#82ca9d", fillOpacity: 0.6 })), _jsx(Legend, {})] }) }) }) })] }));
};
export default CategoryVariationChart;
