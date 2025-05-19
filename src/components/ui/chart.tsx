import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import './chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  title?: string;
  height?: number;
  width?: number;
}

export function Chart({ data, options, title, height, width }: ChartProps) {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: !!title,
        text: title || '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  return (
    <div className="chart-container" style={{ height: height || 400, width: width || '100%' }}>
      <Line data={data} options={mergedOptions} />
    </div>
  );
}

interface ChartLegendProps {
  items: Array<{
    label: string;
    color: string;
  }>;
}

export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <div className="chart-legend">
      {items.map((item, index) => (
        <div key={index} className="chart-legend-item">
          <div className="chart-legend-color" style={{ backgroundColor: item.color }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

interface ChartTooltipProps {
  x: number;
  y: number;
  content: React.ReactNode;
}

export function ChartTooltip({ x, y, content }: ChartTooltipProps) {
  return (
    <div className="chart-tooltip" style={{ left: x, top: y }}>
      {content}
    </div>
  );
}
