
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

interface GaugeRatingProps {
  ratingCode: string;
}

export function GaugeRating({ ratingCode }: GaugeRatingProps) {
  // Map rating code to a score for visualization
  const getRatingScore = (code: string): number => {
    switch(code) {
      case 'A': return 90;
      case 'B': return 75;
      case 'C': return 60;
      case 'D': return 45;
      case 'E': return 25;
      default: return 0;
    }
  };
  
  const getRatingColor = (code: string): string => {
    switch(code) {
      case 'A': return '#22c55e'; // green
      case 'B': return '#84cc16'; // lime
      case 'C': return '#facc15'; // yellow
      case 'D': return '#f97316'; // orange
      case 'E': return '#ef4444'; // red
      default: return '#a1a1aa'; // gray
    }
  };

  const score = getRatingScore(ratingCode);
  const color = getRatingColor(ratingCode);
  
  // Creating the half gauge
  const data = [
    { name: 'Rating', value: score },
    { name: 'Empty', value: 100 - score }
  ];

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill={color} fontSize="48px" fontWeight="bold">
          {ratingCode}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Rating Gauge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={0}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                blendStroke
              >
                <Cell key={`cell-0`} fill={color} />
                <Cell key={`cell-1`} fill="#f1f5f9" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
