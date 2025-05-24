
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TrendingUp, Target, DollarSign, BarChart3 } from 'lucide-react';

const PriceOptimization = () => {
  const handleOptimize = () => {
    toast.success('Price optimization process started');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Price Optimization</h1>
          <p className="text-muted-foreground">
            AI-powered pricing optimization and recommendations
          </p>
        </div>
        <Button onClick={handleOptimize}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Start Optimization
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Potential</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$24,580</div>
            <p className="text-xs text-muted-foreground">Estimated monthly increase</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Current efficiency rating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Analyzed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Pending implementation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Market Analysis</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Current market conditions suggest increasing prices by 3-5% for premium products.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Competitor Benchmarking</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your pricing is 8% below market average. Consider strategic price adjustments.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Demand Forecasting</h4>
              <p className="text-sm text-muted-foreground mt-1">
                High demand products can support 2-4% price increases without significant volume loss.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceOptimization;
