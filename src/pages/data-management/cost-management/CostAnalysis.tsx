import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, Download, Filter, Search, AlertCircle, Calendar, RefreshCw } from "lucide-react";
import { CostMetricCard } from '@/components/cost-analysis/CostMetricCard';
import { CostTrendChart } from '@/components/cost-analysis/CostTrendChart';
import { SupplierComparisonChart } from '@/components/cost-analysis/SupplierComparisonChart';
import { CategoryVariationChart } from '@/components/cost-analysis/CategoryVariationChart';
import { useCostAnalysis, CostAnalysisOptions } from '@/hooks/use-cost-analysis';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema for filters
const filterSchema = z.object({
  suppliers: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  minCost: z.string().optional(),
  maxCost: z.string().optional(),
  includeInactive: z.boolean().default(false),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional()
});

type FilterFormData = z.infer<typeof filterSchema>;

export default function CostAnalysis() {
  // State for time range filter
  const [timeRange, setTimeRange] = useState<CostAnalysisOptions['timeRange']>('6m');
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch cost analysis data
  const { data, isLoading, isError, refetch } = useCostAnalysis({ timeRange });

  // Form handling for filter
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      includeInactive: false
    }
  });

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Handle time range change
  const handleTimeRangeChange = (value: CostAnalysisOptions['timeRange']) => {
    try {
      setTimeRange(value);
      toast.success(`Updated time range to ${getTimeRangeLabel(value)}`);
    } catch (err) {
      toast.error('Failed to update time range');
      console.error('Error updating time range:', err);
    }
  };

  // Handle export action
  const handleExport = () => {
    try {
      toast.success('Exporting cost analysis data...');
      // In a real app, trigger actual export functionality
    } catch (err) {
      toast.error('Failed to export data');
      console.error('Error exporting data:', err);
    }
  };

  // Handle showing filter dialog
  const handleShowFilter = () => {
    try {
      setShowFilterDialog(true);
    } catch (err) {
      toast.error('Failed to open filter dialog');
      console.error('Error opening filter:', err);
    }
  };

  // Handle applying filters
  const onSubmitFilter = (data: FilterFormData) => {
    try {
      console.log('Applied filters:', data);
      toast.success('Filters applied successfully');
      setShowFilterDialog(false);
      
      // In a real app, we'd apply these filters to the query
    } catch (err) {
      toast.error('Failed to apply filters');
      console.error('Error applying filters:', err);
    }
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      await refetch();
      toast.success('Data refreshed successfully');
    } catch (err) {
      setError('Failed to refresh data. Please try again.');
      toast.error('Failed to refresh data');
      console.error('Error refreshing data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get label for time range
  const getTimeRangeLabel = (range: CostAnalysisOptions['timeRange']) => {
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
    } else {
      setError(null);
    }
  }, [isError]);

  // Rendering loading state
  if (isLoading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
          <p className="text-muted-foreground">
            Analyze supplier costs and identify savings opportunities (ZAR)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Select 
            value={timeRange} 
            onValueChange={handleTimeRangeChange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleShowFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CostMetricCard
          title="Average Cost Change"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          value={data?.averageCostChange.value || 0}
          change={data?.averageCostChange.change || 0}
        />
        
        <CostMetricCard
          title="Cost Savings Identified"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={data?.costSavings.value || 0}
          change={data?.costSavings.change || 0}
        />
        
        <CostMetricCard
          title="Suppliers with Price Increases"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          value={data?.suppliersWithIncreases.value || 0}
          change={data?.suppliersWithIncreases.change || 0}
        />
        
        <CostMetricCard
          title="Products with Price Alerts"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          value={data?.productsWithAlerts.value || 0}
          change={data?.productsWithAlerts.change || 0}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <CostTrendChart
          data={data?.costTrends || []}
          title="Cost Trend Analysis"
          description="View cost trends over time by category"
        />
        
        <SupplierComparisonChart
          data={data?.supplierDistribution || []}
          title="Supplier Cost Comparison"
          description="Compare costs across suppliers"
          colors={COLORS}
        />
      </div>
      
      <CategoryVariationChart
        data={data?.categoryVariation || []}
        title="Cost Variation by Category"
        description="Analyze cost variations across product categories"
      />
      
      {/* Advanced Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Advanced Cost Filters</DialogTitle>
            <DialogDescription>
              Refine the cost analysis data by setting specific filter criteria.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitFilter)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">From Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateFrom"
                      type="date"
                      className="pl-8"
                      {...register('dateFrom')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">To Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateTo"
                      type="date"
                      className="pl-8"
                      {...register('dateTo')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minCost">Minimum Cost (ZAR)</Label>
                  <Input
                    id="minCost"
                    type="number"
                    placeholder="0"
                    {...register('minCost')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxCost">Maximum Cost (ZAR)</Label>
                  <Input
                    id="maxCost"
                    type="number"
                    placeholder="100000"
                    {...register('maxCost')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Suppliers</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Suppliers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    <SelectItem value="audiotech">AudioTech Pro</SelectItem>
                    <SelectItem value="visualedge">VisualEdge</SelectItem>
                    <SelectItem value="soundvision">SoundVision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Categories</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="components">Components</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="includeInactive" {...register('includeInactive')} />
                <Label htmlFor="includeInactive">Include Inactive Suppliers</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit">Apply Filters</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
