
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, PieChart, BarChart3, TrendingUp } from 'lucide-react';

const BrandAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Detailed analysis of brand performance metrics and trends
        </p>
      </div>
      
      {/* Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Brand Recognition Trends</CardTitle>
            <CardDescription>Monthly recognition metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LineChart className="h-16 w-16 mx-auto mb-2" />
              <p>Brand recognition trend chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market Share Analysis</CardTitle>
            <CardDescription>Comparison with competitors</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <PieChart className="h-16 w-16 mx-auto mb-2" />
              <p>Market share distribution</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Breakdown of brand audience by demographics</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-2" />
              <p>Demographic distribution chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Brand Growth</CardTitle>
            <CardDescription>Year-over-year growth metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <TrendingUp className="h-16 w-16 mx-auto mb-2" />
              <p>Growth trend visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandAnalytics;
