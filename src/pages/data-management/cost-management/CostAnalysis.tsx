
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, Download } from "lucide-react";
import { CostMetricCard } from '@/components/cost-analysis/CostMetricCard';
import { CostTrendChart } from '@/components/cost-analysis/CostTrendChart';
import { SupplierComparisonChart } from '@/components/cost-analysis/SupplierComparisonChart';
import { CategoryVariationChart } from '@/components/cost-analysis/CategoryVariationChart';
import { useCostAnalysis, CostAnalysisOptions } from '@/hooks/use-cost-analysis';

export default function CostAnalysis() {
  // State for time range filter
  const [timeRange, setTimeRange] = useState<CostAnalysisOptions['timeRange']>('6m');
  
  // Fetch cost analysis data
  const { data, isLoading } = useCostAnalysis({ timeRange });

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
          <p className="text-muted-foreground">
            Analyze supplier costs and identify savings opportunities (ZAR)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select 
            value={timeRange} 
            onValueChange={(value: CostAnalysisOptions['timeRange']) => setTimeRange(value)}
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
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CostMetricCard
          title="Average Cost Change"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          value={data.averageCostChange.value}
          change={data.averageCostChange.change}
        />
        
        <CostMetricCard
          title="Cost Savings Identified"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={data.costSavings.value}
          change={data.costSavings.change}
        />
        
        <CostMetricCard
          title="Suppliers with Price Increases"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          value={data.suppliersWithIncreases.value}
          change={data.suppliersWithIncreases.change}
        />
        
        <CostMetricCard
          title="Products with Price Alerts"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          value={data.productsWithAlerts.value}
          change={data.productsWithAlerts.change}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <CostTrendChart
          data={data.costTrends}
          title="Cost Trend Analysis"
          description="View cost trends over time by category"
        />
        
        <SupplierComparisonChart
          data={data.supplierDistribution}
          title="Supplier Cost Comparison"
          description="Compare costs across suppliers"
          colors={COLORS}
        />
      </div>
      
      <CategoryVariationChart
        data={data.categoryVariation}
        title="Cost Variation by Category"
        description="Analyze cost variations across product categories"
      />
    </div>
  );
}
