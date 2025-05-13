
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface EnhancedLineChartProps {
  data: DataPoint[];
  dataKey: string;
  xAxisKey: string;
  name?: string;
  unit?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  threshold?: number;
  domain?: [number, number];
}

const EnhancedLineChart: React.FC<EnhancedLineChartProps> = ({
  data,
  dataKey,
  xAxisKey,
  name,
  unit = '',
  color = '#6366f1',
  height = 300,
  showGrid = true,
  showLegend = true,
  threshold,
  domain
}) => {
  // Determine line color based on threshold if provided
  const getLineColor = () => {
    if (!threshold) return color;
    
    const lastValue = data.length > 0 ? data[data.length - 1][dataKey] : 0;
    return lastValue > threshold ? '#ef4444' : '#10b981';
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />}
        <XAxis 
          dataKey={xAxisKey}
          tick={{ fill: '#999', fontSize: 12 }}
          axisLine={{ stroke: '#333', opacity: 0.2 }}
          tickLine={{ stroke: '#333', opacity: 0.2 }}
        />
        <YAxis 
          domain={domain}
          tick={{ fill: '#999', fontSize: 12 }}
          axisLine={{ stroke: '#333', opacity: 0.2 }}
          tickLine={{ stroke: '#333', opacity: 0.2 }}
          width={40}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.85)', 
            border: '1px solid #333',
            borderRadius: '4px',
            color: '#fff'
          }}
          itemStyle={{ color: getLineColor() }}
          formatter={(value) => [`${value} ${unit}`, name || dataKey]}
          labelStyle={{ color: '#999' }}
        />
        {showLegend && <Legend />}
        {threshold && (
          <ReferenceLine 
            y={threshold} 
            stroke="#f97316"
            strokeDasharray="3 3"
            label={{ 
              value: "Threshold", 
              position: "insideTopLeft", 
              fill: "#f97316",
              fontSize: 12
            }}
          />
        )}
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={getLineColor()} 
          strokeWidth={2}
          dot={{ r: 3, fill: getLineColor() }}
          name={name || dataKey}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnhancedLineChart;
