
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change: number | null;
}

export default function KpiCard({ title, value, change }: KpiCardProps) {
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';
  const changeSign = change >= 0 ? '+' : '';
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
      {change != null && (
        <div className={`text-sm ${changeColor}`}>
          {changeSign}{change}%
        </div>
      )}
    </div>
  );
}
