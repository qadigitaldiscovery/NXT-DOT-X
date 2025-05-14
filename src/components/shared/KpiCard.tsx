import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
}

export default function KpiCard({ title, value, change }: KpiCardProps) {
  const changeColor = change >= 0 ? 'text-green-400' : 'text-red-500';
  const changeSign = change >= 0 ? '+' : '';
  return (
    <div className="bg-dockred-dark text-white shadow-lg rounded-xl p-4">
      <div className="text-sm uppercase tracking-wide">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm ${changeColor}`}>{changeSign}{change}%</div>
    </div>
  );
}
