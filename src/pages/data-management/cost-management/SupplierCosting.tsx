import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, LineChart, PieChart, Users, FileUp, RefreshCw, Plus } from "lucide-react";
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
      } else {
        setIsLoading(false);
        setHasError(true);
        toast.error('Failed to refresh data');
      }
    }, 1000);
  };

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
    toast.info(`Timeframe changed to ${value}`);
  };
  
  const handleAddSupplierCost = () => {
    toast.success('Add supplier cost functionality coming soon');
  };

  // Bar chart component for supplier costs
  const SupplierCostChart = () => (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Top Supplier Costs</CardTitle>
        <CardDescription>Monthly spend by supplier</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : hasError ? (
          <Alert className="h-64 flex items-center">
            <AlertDescription>
              Failed to load supplier cost data. 
              <Button variant="link" onClick={handleRefresh} className="p-0 h-auto font-normal">Try again</Button>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="h-64 relative">
            {/* Simulated bar chart */}
            <div className="absolute inset-0 flex items-end justify-around pb-8">
              {mockChartData.suppliers.map((supplier, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className="w-16 bg-primary/80 hover:bg-primary transition-colors rounded-t"
                    style={{ height: `${supplier.percentage * 2}%` }}
                  ></div>
                  <span className="mt-2 text-xs font-medium">{supplier.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute left-0 bottom-0 w-full h-px bg-border"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Line chart for cost trends
  const CostTrendChart = () => (
    <Card>
      <CardHeader>
        <CardTitle>Cost Trends</CardTitle>
        <CardDescription>Monthly cost analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : hasError ? (
          <Alert className="h-64 flex items-center">
            <AlertDescription>
              Failed to load trend data. 
              <Button variant="link" onClick={handleRefresh} className="p-0 h-auto font-normal">Try again</Button>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="h-64 relative">
            {/* Simulated line chart */}
            <svg className="w-full h-full">
              <path 
                d="M 40 200 L 90 140 L 140 160 L 190 100 L 240 120 L 290 80" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="3"
              />
              <g>
                {mockChartData.monthlyCosts.map((item, i) => (
                  <text 
                    key={i} 
                    x={40 + i * 50} 
                    y="220" 
                    textAnchor="middle" 
                    className="text-xs text-muted-foreground"
                  >
                    {item.month}
                  </text>
                ))}
              </g>
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Pie chart for cost categories
  const CostCategoryChart = () => (
    <Card>
      <CardHeader>
        <CardTitle>Cost Categories</CardTitle>
        <CardDescription>Distribution by category</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : hasError ? (
          <Alert className="h-64 flex items-center">
            <AlertDescription>
              Failed to load category data. 
              <Button variant="link" onClick={handleRefresh} className="p-0 h-auto font-normal">Try again</Button>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="h-64 flex items-center justify-center">
            {/* Simulated pie chart */}
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="10" 
                  strokeDasharray="282.7"
                  strokeDashoffset="282.7"
                  style={{ strokeDashoffset: 282.7 * (1 - mockChartData.categories[0].value / 100) }}
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="hsl(var(--primary) / 0.7)" 
                  strokeWidth="10" 
                  strokeDasharray="282.7"
                  strokeDashoffset="282.7"
                  style={{ strokeDashoffset: 282.7 * (1 - mockChartData.categories[1].value / 100) }}
                  transform="rotate(90 50 50)"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="hsl(var(--primary) / 0.5)" 
                  strokeWidth="10" 
                  strokeDasharray="282.7"
                  strokeDashoffset="282.7"
                  style={{ strokeDashoffset: 282.7 * (1 - mockChartData.categories[2].value / 100) }}
                  transform="rotate(180 50 50)"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="hsl(var(--primary) / 0.3)" 
                  strokeWidth="10" 
                  strokeDasharray="282.7"
                  strokeDashoffset="282.7"
                  style={{ strokeDashoffset: 282.7 * (1 - mockChartData.categories[3].value / 100) }}
                  transform="rotate(270 50 50)"
                />
              </svg>
            </div>
            <div className="ml-4 space-y-2">
              {mockChartData.categories.map((category, i) => (
                <div key={i} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ 
                      backgroundColor: `hsl(var(--primary) / ${1 - (i * 0.2)})` 
                    }}
                  ></div>
                  <span className="text-xs">{category.name} ({category.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" aria-label="Supplier Costing">Supplier Costing</h1>
          <p className="text-muted-foreground mb-6">Manage supplier costs and pricing data</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
            <SelectTrigger className="w-36" aria-label="Select time period">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading} aria-label="Refresh data">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleAddSupplierCost} aria-label="Add supplier cost">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-4 h-auto p-1">
          <TabsTrigger value="overview" className="py-2">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="supplier-breakdown" className="py-2">
            <Users className="h-4 w-4 mr-2" />
            Supplier Breakdown
          </TabsTrigger>
          <TabsTrigger value="uploads" className="py-2">
            <FileUp className="h-4 w-4 mr-2" />
            File Uploads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SupplierCostChart />
            <CostCategoryChart />
          </div>
          <CostTrendChart />
        </TabsContent>

        <TabsContent value="supplier-breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Cost Breakdown</CardTitle>
              <CardDescription>Detailed analysis by supplier</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : hasError ? (
                <Alert className="h-64 flex items-center">
                  <AlertDescription>
                    Failed to load supplier breakdown. 
                    <Button variant="link" onClick={handleRefresh} className="p-0 h-auto font-normal">Try again</Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {mockChartData.suppliers.map((supplier, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Users className="h-3 w-3 text-primary" />
                        </div>
                        <span>{supplier.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden mr-3">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${supplier.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">${supplier.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads">
          <CostDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierCosting;
