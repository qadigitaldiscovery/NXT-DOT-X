
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VendorPerformance } from '@/types/vendor';
import { formatDate } from '@/utils/vendorCalculations';

interface PerformanceChartProps {
  data: VendorPerformance[];
  emaScore?: number;
  hasAlert?: boolean;
}

export function PerformanceChart({ data, emaScore, hasAlert }: PerformanceChartProps) {
  // Format data for the chart
  const chartData = data.map(item => ({
    date: formatDate(item.date),
    score: item.score
  }));
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Performance Trend</CardTitle>
        {hasAlert && (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            10%+ Decline
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#0ea5e9" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
              />
              {emaScore && (
                <Line 
                  type="monotone" 
                  data={[
                    { date: chartData[0].date, score: emaScore },
                    { date: chartData[chartData.length - 1].date, score: emaScore }
                  ]}
                  dataKey="score" 
                  stroke="#94a3b8" 
                  strokeWidth={1} 
                  strokeDasharray="5 5"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        {emaScore && (
          <div className="mt-2 text-sm text-muted-foreground">
            4-period EMA: {Math.round(emaScore)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
