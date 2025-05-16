import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const DataInsights = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Data Insights</h1>
      <p className="text-gray-600 mb-6">View and analyze your data insights</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Cost Analysis</CardTitle>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,565.78</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            <div className="h-[80px] mt-4 bg-slate-100 rounded-md"></div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Supplier Performance</CardTitle>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.8%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            <div className="h-[80px] mt-4 bg-slate-100 rounded-md"></div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Category Distribution</CardTitle>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">427 Items</div>
            <p className="text-xs text-muted-foreground">Across 8 categories</p>
            <div className="h-[80px] mt-4 bg-slate-100 rounded-md"></div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>
              Comprehensive analysis of your data across multiple dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-slate-100 rounded-md"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataInsights; 