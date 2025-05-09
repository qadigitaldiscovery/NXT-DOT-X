
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type CostTrendData = {
  month: string;
  cost: number;
  previous: number;
};

type CostTrendChartProps = {
  data: CostTrendData[];
  title: string;
  description: string;
};

export const CostTrendChart = ({ data, title, description }: CostTrendChartProps) => {
  return (
    <Card className="col-span-1 backdrop-blur-md bg-white/30 border border-white/10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value) => [`R${value.toLocaleString()}`, 'Amount']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#0EA5E9" 
              strokeWidth={2} 
              name="Current Period"
              activeDot={{ r: 8 }}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke="#94A3B8" 
              strokeDasharray="5 5" 
              name="Previous Period" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
