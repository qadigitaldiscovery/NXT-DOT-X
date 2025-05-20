import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatDate } from "../../../lib/utils";

interface PerformanceChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  title: string;
  label: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title,
  label
}) => {
  // Find min and max values for scaling
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, 100);
  const minValue = Math.min(...values, 0);

  // Calculate dimensions
  const width = 600;
  const height = 300;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Scale values to chart dimensions
  const scaleY = (value: number) => {
    return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight + padding;
  };

  const scaleX = (index: number) => {
    return (index / (data.length - 1)) * chartWidth + padding;
  };

  // Generate path data
  const pathData = data.map((point, index) => {
    const x = scaleX(index);
    const y = scaleY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate area path data
  const areaPathData = `
    ${pathData}
    L ${scaleX(data.length - 1)} ${scaleY(minValue)}
    L ${scaleX(0)} ${scaleY(minValue)}
    Z
  `;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <svg width={width} height={height} className="w-full">
            {/* Y-axis grid lines and labels */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <React.Fragment key={tick}>
                <line
                  x1={padding}
                  y1={scaleY(tick)}
                  x2={width - padding}
                  y2={scaleY(tick)}
                  stroke="#e5e7eb"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding - 10}
                  y={scaleY(tick)}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="text-xs text-gray-500"
                >
                  {tick}
                </text>
              </React.Fragment>
            ))}

            {/* Area under the line */}
            <path
              d={areaPathData}
              fill="url(#gradient)"
              opacity={0.2}
            />

            {/* Line chart */}
            <path
              d={pathData}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
            />

            {/* Data points */}
            {data.map((point, index) => (
              <g key={index}>
                <circle
                  cx={scaleX(index)}
                  cy={scaleY(point.value)}
                  r={4}
                  fill="#3b82f6"
                />
                {/* X-axis labels */}
                <text
                  x={scaleX(index)}
                  y={height - padding / 2}
                  textAnchor="middle"
                  className="text-xs text-gray-500"
                >
                  {formatDate(point.date)}
                </text>
              </g>
            ))}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};
