import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Users, FileUp, RefreshCw, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'sonner';
import CostDashboard from './CostDashboard';
// Mock data for charts - in a real application, this would come from an API
const mockChartData = {
    suppliers: [
        { name: 'Supplier A', cost: 12500, percentage: 35 },
        { name: 'Supplier B', cost: 9800, percentage: 28 },
        { name: 'Supplier C', cost: 7600, percentage: 22 },
        { name: 'Supplier D', cost: 5100, percentage: 15 },
    ],
    monthlyCosts: [
        { month: 'Jan', cost: 8500 },
        { month: 'Feb', cost: 9200 },
        { month: 'Mar', cost: 7800 },
        { month: 'Apr', cost: 10500 },
        { month: 'May', cost: 9800 },
        { month: 'Jun', cost: 11200 },
    ],
    categories: [
        { name: 'Electronics', value: 42 },
        { name: 'Furniture', value: 28 },
        { name: 'Office Supplies', value: 18 },
        { name: 'Other', value: 12 },
    ]
};
const SupplierCosting = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [timeFrame, setTimeFrame] = useState('6m');
    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    const handleRefresh = () => {
        setIsLoading(true);
        setHasError(false);
        // Simulate API call
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate for demo
            if (success) {
                setIsLoading(false);
                toast.success('Data refreshed successfully');
            }
            else {
                setIsLoading(false);
                setHasError(true);
                toast.error('Failed to refresh data');
            }
        }, 1000);
    };
    const handleTimeFrameChange = (value) => {
        setTimeFrame(value);
        toast.info(`Timeframe changed to ${value}`);
    };
    const handleAddSupplierCost = () => {
        toast.success('Add supplier cost functionality coming soon');
    };
    // Bar chart component for supplier costs
    const SupplierCostChart = () => (_jsxs(Card, { className: "col-span-1 md:col-span-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Top Supplier Costs" }), _jsx(CardDescription, { children: "Monthly spend by supplier" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "h-64 flex items-center justify-center", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" }) })) : hasError ? (_jsx(Alert, { className: "h-64 flex items-center", children: _jsxs(AlertDescription, { children: ["Failed to load supplier cost data.", _jsx(Button, { variant: "link", onClick: handleRefresh, className: "p-0 h-auto font-normal", children: "Try again" })] }) })) : (_jsxs("div", { className: "h-64 relative", children: [_jsx("div", { className: "absolute inset-0 flex items-end justify-around pb-8", children: mockChartData.suppliers.map((supplier, i) => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-16 bg-primary/80 hover:bg-primary transition-colors rounded-t", style: { height: `${supplier.percentage * 2}%` } }), _jsx("span", { className: "mt-2 text-xs font-medium", children: supplier.name })] }, i))) }), _jsx("div", { className: "absolute left-0 bottom-0 w-full h-px bg-border" })] })) })] }));
    // Line chart for cost trends
    const CostTrendChart = () => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Cost Trends" }), _jsx(CardDescription, { children: "Monthly cost analysis" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "h-64 flex items-center justify-center", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" }) })) : hasError ? (_jsx(Alert, { className: "h-64 flex items-center", children: _jsxs(AlertDescription, { children: ["Failed to load trend data.", _jsx(Button, { variant: "link", onClick: handleRefresh, className: "p-0 h-auto font-normal", children: "Try again" })] }) })) : (_jsx("div", { className: "h-64 relative", children: _jsxs("svg", { className: "w-full h-full", children: [_jsx("path", { d: "M 40 200 L 90 140 L 140 160 L 190 100 L 240 120 L 290 80", fill: "none", stroke: "hsl(var(--primary))", strokeWidth: "3" }), _jsx("g", { children: mockChartData.monthlyCosts.map((item, i) => (_jsx("text", { x: 40 + i * 50, y: "220", textAnchor: "middle", className: "text-xs text-muted-foreground", children: item.month }, i))) })] }) })) })] }));
    // Pie chart for cost categories
    const CostCategoryChart = () => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Cost Categories" }), _jsx(CardDescription, { children: "Distribution by category" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "h-64 flex items-center justify-center", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" }) })) : hasError ? (_jsx(Alert, { className: "h-64 flex items-center", children: _jsxs(AlertDescription, { children: ["Failed to load category data.", _jsx(Button, { variant: "link", onClick: handleRefresh, className: "p-0 h-auto font-normal", children: "Try again" })] }) })) : (_jsxs("div", { className: "h-64 flex items-center justify-center", children: [_jsx("div", { className: "relative w-40 h-40", children: _jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "transparent", stroke: "hsl(var(--primary))", strokeWidth: "10", strokeDasharray: "282.7", strokeDashoffset: "282.7", style: { strokeDashoffset: 282.7 * (1 - mockChartData.categories[0].value / 100) } }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "transparent", stroke: "hsl(var(--primary) / 0.7)", strokeWidth: "10", strokeDasharray: "282.7", strokeDashoffset: "282.7", style: { strokeDashoffset: 282.7 * (1 - mockChartData.categories[1].value / 100) }, transform: "rotate(90 50 50)" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "transparent", stroke: "hsl(var(--primary) / 0.5)", strokeWidth: "10", strokeDasharray: "282.7", strokeDashoffset: "282.7", style: { strokeDashoffset: 282.7 * (1 - mockChartData.categories[2].value / 100) }, transform: "rotate(180 50 50)" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "transparent", stroke: "hsl(var(--primary) / 0.3)", strokeWidth: "10", strokeDasharray: "282.7", strokeDashoffset: "282.7", style: { strokeDashoffset: 282.7 * (1 - mockChartData.categories[3].value / 100) }, transform: "rotate(270 50 50)" })] }) }), _jsx("div", { className: "ml-4 space-y-2", children: mockChartData.categories.map((category, i) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 rounded-full mr-2", style: {
                                            backgroundColor: `hsl(var(--primary) / ${1 - (i * 0.2)})`
                                        } }), _jsxs("span", { className: "text-xs", children: [category.name, " (", category.value, "%)"] })] }, i))) })] })) })] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", "aria-label": "Supplier Costing", children: "Supplier Costing" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Manage supplier costs and pricing data" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Select, { value: timeFrame, onValueChange: handleTimeFrameChange, children: [_jsx(SelectTrigger, { className: "w-36", "aria-label": "Select time period", children: _jsx(SelectValue, { placeholder: "Time period" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1m", children: "Last Month" }), _jsx(SelectItem, { value: "3m", children: "Last 3 Months" }), _jsx(SelectItem, { value: "6m", children: "Last 6 Months" }), _jsx(SelectItem, { value: "1y", children: "Last Year" }), _jsx(SelectItem, { value: "all", children: "All Time" })] })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: isLoading, "aria-label": "Refresh data", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] }), _jsxs(Button, { onClick: handleAddSupplierCost, "aria-label": "Add supplier cost", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add"] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [_jsxs(TabsList, { className: "grid grid-cols-2 md:grid-cols-3 gap-4 h-auto p-1", children: [_jsxs(TabsTrigger, { value: "overview", className: "py-2", children: [_jsx(BarChart3, { className: "h-4 w-4 mr-2" }), "Overview"] }), _jsxs(TabsTrigger, { value: "supplier-breakdown", className: "py-2", children: [_jsx(Users, { className: "h-4 w-4 mr-2" }), "Supplier Breakdown"] }), _jsxs(TabsTrigger, { value: "uploads", className: "py-2", children: [_jsx(FileUp, { className: "h-4 w-4 mr-2" }), "File Uploads"] })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(SupplierCostChart, {}), _jsx(CostCategoryChart, {})] }), _jsx(CostTrendChart, {})] }), _jsx(TabsContent, { value: "supplier-breakdown", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Supplier Cost Breakdown" }), _jsx(CardDescription, { children: "Detailed analysis by supplier" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "h-64 flex items-center justify-center", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" }) })) : hasError ? (_jsx(Alert, { className: "h-64 flex items-center", children: _jsxs(AlertDescription, { children: ["Failed to load supplier breakdown.", _jsx(Button, { variant: "link", onClick: handleRefresh, className: "p-0 h-auto font-normal", children: "Try again" })] }) })) : (_jsx("div", { className: "space-y-4", children: mockChartData.suppliers.map((supplier, i) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3", children: _jsx(Users, { className: "h-3 w-3 text-primary" }) }), _jsx("span", { children: supplier.name })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-48 h-2 bg-secondary rounded-full overflow-hidden mr-3", children: _jsx("div", { className: "h-full bg-primary", style: { width: `${supplier.percentage}%` } }) }), _jsxs("span", { className: "text-sm font-medium", children: ["$", supplier.cost.toLocaleString()] })] })] }, i))) })) })] }) }), _jsx(TabsContent, { value: "uploads", children: _jsx(CostDashboard, {}) })] })] }));
};
export default SupplierCosting;
