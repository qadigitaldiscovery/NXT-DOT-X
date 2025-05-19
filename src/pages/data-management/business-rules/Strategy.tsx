
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, LineChart, Goal } from 'lucide-react';

const Strategy = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Strategy & Decisions</h1>
      <p className="text-muted-foreground">Strategic planning and business decision management</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Strategic Objectives</CardTitle>
            <Goal className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Current strategic objectives and progress</p>
            <div className="mt-4">
              <div className="text-sm font-medium">Cost Optimization</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="text-sm mt-2 text-muted-foreground">65% complete</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Performance Metrics</CardTitle>
            <LineChart className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Key performance indicators</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Revenue</div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-green-500">+12.5%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Costs</div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-red-500">+5.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Decision Framework</CardTitle>
            <Goal className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Business decision management framework</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Strategic Decision Matrix</li>
              <li>• Risk Assessment Tools</li>
              <li>• Decision Approval Workflows</li>
              <li>• Impact Analysis Templates</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Strategy;
