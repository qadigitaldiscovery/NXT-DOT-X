import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, DollarSign, Download, Filter, AlertCircle, Calendar, RefreshCw } from "lucide-react";
import { CostMetricCard } from '@/components/cost-analysis/CostMetricCard';
import { CostTrendChart } from '@/components/cost-analysis/CostTrendChart';
import { SupplierComparisonChart } from '@/components/cost-analysis/SupplierComparisonChart';
import { CategoryVariationChart } from '@/components/cost-analysis/CategoryVariationChart';
import { useCostAnalysis } from '@/hooks/use-cost-analysis';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "../../../components/ui/toast";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Form schema for filters
const filterSchema = z.object({
    suppliers: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    minCost: z.string().optional(),
    maxCost: z.string().optional(),
    includeInactive: z.boolean(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional()
});
export default function CostAnalysis() {
    // State for time range filter
    const [timeRange, setTimeRange] = useState('6m');
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [error, setError] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    // Fetch cost analysis data
    const { data, isLoading, isError, refetch } = useCostAnalysis({ timeRange });
    // Form handling for filter
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            includeInactive: false
        }
    });
    // Colors for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    // Handle time range change
    const handleTimeRangeChange = (value) => {
        try {
            setTimeRange(value);
            toast.default({
                title: "Success",
                description: `Updated time range to ${getTimeRangeLabel(value)}`
            });
        }
        catch (err) {
            toast.error({
                title: "Error",
                description: 'Failed to update time range'
            });
            console.error('Error updating time range:', err);
        }
    };
    // Handle export action
    const handleExport = () => {
        try {
            toast.default({
                title: "Success",
                description: 'Exporting cost analysis data...'
            });
            // In a real app, trigger actual export functionality
        }
        catch (err) {
            toast.error({
                title: "Error",
                description: 'Failed to export data'
            });
            console.error('Error exporting data:', err);
        }
    };
    // Handle showing filter dialog
    const handleShowFilter = () => {
        try {
            setShowFilterDialog(true);
        }
        catch (err) {
            toast.error({
                title: "Error",
                description: 'Failed to open filter dialog'
            });
            console.error('Error opening filter:', err);
        }
    };
    // Handle applying filters
    const onSubmitFilter = (data) => {
        try {
            console.log('Applied filters:', data);
            toast.default({
                title: "Success",
                description: 'Filters applied successfully'
            });
            setShowFilterDialog(false);
            // In a real app, we'd apply these filters to the query
        }
        catch (err) {
            toast.error({
                title: "Error",
                description: 'Failed to apply filters'
            });
            console.error('Error applying filters:', err);
        }
    };
    // Handle manual refresh
    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            setError(null);
            await refetch();
            toast.default({
                title: "Success",
                description: 'Data refreshed successfully'
            });
        }
        catch (err) {
            setError('Failed to refresh data. Please try again.');
            toast.error({
                title: "Error",
                description: 'Failed to refresh data'
            });
            console.error('Error refreshing data:', err);
        }
        finally {
            setIsRefreshing(false);
        }
    };
    // Get label for time range
    const getTimeRangeLabel = (range) => {
        switch (range) {
            case '1m': return 'Last Month';
            case '3m': return 'Last 3 Months';
            case '6m': return 'Last 6 Months';
            case '12m': return 'Last Year';
            default: return 'Custom Range';
        }
    };
    // Set error if API call fails
    useEffect(() => {
        if (isError) {
            setError('Failed to load cost analysis data. Please try again.');
        }
        else {
            setError(null);
        }
    }, [isError]);
    // Rendering loading state
    if (isLoading && !isRefreshing) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Cost Analysis" }), _jsx("p", { className: "text-muted-foreground", children: "Analyze supplier costs and identify savings opportunities (ZAR)" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", onClick: handleRefresh, disabled: isRefreshing, children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}` }), "Refresh"] }), _jsxs(Select, { value: timeRange, onValueChange: handleTimeRangeChange, children: [_jsx(SelectTrigger, { className: "w-[160px]", children: _jsx(SelectValue, { placeholder: "Select time range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1m", children: "Last Month" }), _jsx(SelectItem, { value: "3m", children: "Last 3 Months" }), _jsx(SelectItem, { value: "6m", children: "Last 6 Months" }), _jsx(SelectItem, { value: "12m", children: "Last Year" })] })] }), _jsxs(Button, { variant: "outline", onClick: handleShowFilter, children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), "Filter"] }), _jsxs(Button, { variant: "outline", onClick: handleExport, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export"] })] })] }), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [_jsx(CostMetricCard, { title: "Average Cost Change", icon: _jsx(BarChart3, { className: "h-4 w-4 text-muted-foreground" }), value: data?.averageCostChange.value || 0, change: data?.averageCostChange.change || {
                            value: 0,
                            isPositive: true,
                            text: 'no change'
                        } }), _jsx(CostMetricCard, { title: "Cost Savings Identified", icon: _jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" }), value: data?.costSavings.value || 0, change: data?.costSavings.change || {
                            value: 0,
                            isPositive: true,
                            text: 'no change'
                        } }), _jsx(CostMetricCard, { title: "Suppliers with Price Increases", icon: _jsx(BarChart3, { className: "h-4 w-4 text-muted-foreground" }), value: data?.suppliersWithIncreases.value || 0, change: data?.suppliersWithIncreases.change || {
                            value: 0,
                            isPositive: true,
                            text: 'no change'
                        } }), _jsx(CostMetricCard, { title: "Products with Price Alerts", icon: _jsx(BarChart3, { className: "h-4 w-4 text-muted-foreground" }), value: data?.productsWithAlerts.value || 0, change: data?.productsWithAlerts.change || {
                            value: 0,
                            isPositive: true,
                            text: 'no change'
                        } })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsx(CostTrendChart, { data: data?.costTrends || [], title: "Cost Trend Analysis", description: "View cost trends over time by category" }), _jsx(SupplierComparisonChart, { data: data?.supplierDistribution || [], title: "Supplier Cost Comparison", description: "Compare costs across suppliers", colors: COLORS })] }), _jsx(CategoryVariationChart, { data: data?.categoryVariation || [], title: "Cost Variation by Category", description: "Analyze cost variations across product categories" }), _jsx(Dialog, { open: showFilterDialog, onOpenChange: setShowFilterDialog, children: _jsxs(DialogContent, { className: "sm:max-w-[525px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Advanced Cost Filters" }), _jsx(DialogDescription, { children: "Refine the cost analysis data by setting specific filter criteria." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmitFilter), children: [_jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "dateFrom", children: "From Date" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "dateFrom", type: "date", className: "pl-8", ...register('dateFrom') })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "dateTo", children: "To Date" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "dateTo", type: "date", className: "pl-8", ...register('dateTo') })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "minCost", children: "Minimum Cost (ZAR)" }), _jsx(Input, { id: "minCost", type: "number", placeholder: "0", ...register('minCost') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "maxCost", children: "Maximum Cost (ZAR)" }), _jsx(Input, { id: "maxCost", type: "number", placeholder: "100000", ...register('maxCost') })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Suppliers" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "All Suppliers" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Suppliers" }), _jsx(SelectItem, { value: "audiotech", children: "AudioTech Pro" }), _jsx(SelectItem, { value: "visualedge", children: "VisualEdge" }), _jsx(SelectItem, { value: "soundvision", children: "SoundVision" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Categories" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "All Categories" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), _jsx(SelectItem, { value: "electronics", children: "Electronics" }), _jsx(SelectItem, { value: "services", children: "Services" }), _jsx(SelectItem, { value: "components", children: "Components" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2 pt-2", children: [_jsx(Checkbox, { id: "includeInactive", ...register('includeInactive') }), _jsx(Label, { htmlFor: "includeInactive", children: "Include Inactive Suppliers" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", type: "button", onClick: () => reset(), children: "Reset" }), _jsx(Button, { type: "submit", children: "Apply Filters" })] })] })] }) })] }));
}
