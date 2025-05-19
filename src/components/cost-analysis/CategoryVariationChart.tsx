import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data for category variation
const data = [
  { category: 'Electronics', current: 4000, previous: 4500, change: -11.1 },
  { category: 'Office Supplies', current: 3000, previous: 2800, change: 7.1 },
  { category: 'Furniture', current: 2000, previous: 1800, change: 11.1 },
  { category: 'Software', current: 1500, previous: 2000, change: -25.0 },
  { category: 'Services', current: 1000, previous: 800, change: 25.0 },
];

export function CategoryVariationChart() {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Category Cost Variation</CardTitle>
        <CardDescription>Comparison of costs by category over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={(value: number) => `$${value}`} />
              <YAxis 
                dataKey="category" 
                type="category" 
                width={100} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(value: number) => `$${value}`} />
              <Bar dataKey="current" name="Current Period" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="previous" name="Previous Period" fill="#d1d5db" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
