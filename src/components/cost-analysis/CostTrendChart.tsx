import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data for cost trends over time
const data = [
  { month: 'Jan', current: 4000, previous: 4500 },
  { month: 'Feb', current: 3000, previous: 3800 },
  { month: 'Mar', current: 5000, previous: 4200 },
  { month: 'Apr', current: 4500, previous: 4000 },
  { month: 'May', current: 6000, previous: 5500 },
  { month: 'Jun', current: 5500, previous: 5000 },
];

export function CostTrendChart() {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Cost Trends</CardTitle>
        <CardDescription>Monthly cost trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value: number) => `$${value}`} />
              <Tooltip formatter={(value: number) => `$${value}`} labelFormatter={(label: string) => `Month: ${label}`} />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#3b82f6" name="Current Year" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="previous" stroke="#ef4444" name="Previous Year" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
