import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart, PieChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
// Mock data for cost trends
const costTrendData = [
    { month: 'Jan', cost: 5200, previous: 5000 },
    { month: 'Feb', cost: 5400, previous: 5200 },
    { month: 'Mar', cost: 5100, previous: 5300 },
    { month: 'Apr', cost: 5700, previous: 5400 },
    { month: 'May', cost: 5500, previous: 5600 },
];
// Mock data for cost distribution
const costDistributionData = [
    { name: 'AudioTech Pro', value: 35 },
    { name: 'VisualEdge', value: 25 },
    { name: 'SoundVision', value: 20 },
    { name: 'MediaMax', value: 15 },
    { name: 'Others', value: 5 },
];
// Mock data for discount analysis
const discountAnalysisData = [
    { category: 'Speakers', avgDiscount: 12, maxDiscount: 18 },
    { category: 'Displays', avgDiscount: 8, maxDiscount: 15 },
    { category: 'Amplifiers', avgDiscount: 10, maxDiscount: 17 },
    { category: 'Microphones', avgDiscount: 15, maxDiscount: 22 },
    { category: 'Accessories', avgDiscount: 20, maxDiscount: 30 },
];
// Mock data for top products
const topProductsData = [
    {
        id: 1,
        sku: 'AT-SPK-001',
        name: 'Premium Bookshelf Speaker',
        supplier: 'AudioTech Pro',
        cost: 249.99,
        previousCost: 259.99,
        discount: 15,
        margin: 42
    },
    {
        id: 2,
        sku: 'VE-DSP-120',
        name: '4K HDR Display Monitor',
        supplier: 'VisualEdge',
        cost: 599.99,
        previousCost: 599.99,
        discount: 12,
        margin: 38
    },
    {
        id: 3,
        sku: 'SV-AMP-220',
        name: 'Multi-Channel Power Amplifier',
        supplier: 'SoundVision',
        cost: 349.99,
        previousCost: 379.99,
        discount: 18,
        margin: 45
    },
    {
        id: 4,
        sku: 'MM-MIC-320',
        name: 'Studio Condenser Microphone',
        supplier: 'MediaMax',
        cost: 129.99,
        previousCost: 119.99,
        discount: 10,
        margin: 52
    },
    {
        id: 5,
        sku: 'AT-CAB-105',
        name: 'Premium HDMI Cable 3m',
        supplier: 'AudioTech Pro',
        cost: 24.99,
        previousCost: 29.99,
        discount: 25,
        margin: 68
    },
];
// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const CostAnalysis = () => {
    const [timeRange, setTimeRange] = useState('6m');
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Cost Analysis" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [_jsx(SelectTrigger, { className: "w-[160px]", children: _jsx(SelectValue, { placeholder: "Select time range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1m", children: "Last Month" }), _jsx(SelectItem, { value: "3m", children: "Last 3 Months" }), _jsx(SelectItem, { value: "6m", children: "Last 6 Months" }), _jsx(SelectItem, { value: "12m", children: "Last Year" })] })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export"] })] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Cost Trends" }), _jsx(CardDescription, { children: "Average costs over time" })] }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: costTrendData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "cost", stroke: "#0EA5E9", strokeWidth: 2, name: "Current Period" }), _jsx(Line, { type: "monotone", dataKey: "previous", stroke: "#94A3B8", strokeDasharray: "5 5", name: "Previous Period" })] }) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Supplier Cost Distribution" }), _jsx(CardDescription, { children: "Cost breakdown by supplier" })] }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: costDistributionData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, children: costDistributionData.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => `${value}%` }), _jsx(Legend, {})] }) }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Discount Analysis" }), _jsx(CardDescription, { children: "Average and maximum discounts by product category" })] }), _jsx(CardContent, { className: "h-[350px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: discountAnalysisData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "category" }), _jsx(YAxis, { unit: "%" }), _jsx(Tooltip, { formatter: (value) => `${value}%` }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "avgDiscount", name: "Average Discount", fill: "#0EA5E9" }), _jsx(Bar, { dataKey: "maxDiscount", name: "Maximum Discount", fill: "#38BDF8" })] }) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Top Products" }), _jsx(CardDescription, { children: "Products with significant cost changes" })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "SKU" }), _jsx(TableHead, { children: "Product Name" }), _jsx(TableHead, { children: "Supplier" }), _jsx(TableHead, { children: "Current Cost" }), _jsx(TableHead, { children: "Change" }), _jsx(TableHead, { children: "Discount" }), _jsx(TableHead, { children: "Margin" })] }) }), _jsx(TableBody, { children: topProductsData.map((product) => {
                                        const costDiff = ((product.cost - product.previousCost) / product.previousCost) * 100;
                                        return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono", children: product.sku }), _jsx(TableCell, { className: "font-medium", children: product.name }), _jsx(TableCell, { children: product.supplier }), _jsxs(TableCell, { children: ["$", product.cost.toFixed(2)] }), _jsx(TableCell, { children: _jsx("div", { className: "flex items-center", children: costDiff !== 0 ? (_jsxs(_Fragment, { children: [costDiff < 0 ? (_jsx(ArrowDownRight, { className: "mr-1 h-4 w-4 text-green-500" })) : (_jsx(ArrowUpRight, { className: "mr-1 h-4 w-4 text-red-500" })), _jsxs("span", { className: costDiff < 0 ? "text-green-500" : "text-red-500", children: [Math.abs(costDiff).toFixed(2), "%"] })] })) : (_jsx("span", { className: "text-gray-500", children: "0.00%" })) }) }), _jsxs(TableCell, { children: [product.discount, "%"] }), _jsxs(TableCell, { children: [product.margin, "%"] })] }, product.id));
                                    }) })] }) })] })] }));
};
export default CostAnalysis;
