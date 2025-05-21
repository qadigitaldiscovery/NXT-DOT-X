import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
// Sample data to match the chart in the image
const performanceData = [
    { date: '2021-05-02', score: 80 },
    { date: '2021-06-26', score: 85 },
    { date: '2021-07-04', score: 75 },
    { date: '2021-09-25', score: 95 }
];
export const PerformanceChart = () => {
    return (_jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(LineChart, { data: performanceData, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [_jsx(XAxis, { dataKey: "date", tickFormatter: (date) => date.substring(5), padding: { left: 30, right: 30 } }), _jsx(YAxis, { domain: [0, 100], ticks: [0, 25, 50, 75, 100] }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false }), _jsx(Tooltip, { labelFormatter: (date) => `Date: ${date}`, formatter: (value) => [`Score: ${value}`, 'Performance'] }), _jsx(Line, { type: "monotone", dataKey: "score", stroke: "#FF7A00", strokeWidth: 2, dot: { stroke: '#FF7A00', strokeWidth: 2, fill: '#FF7A00', r: 4 }, activeDot: { r: 6 } })] }) }));
};
