import React from 'react';

export default function KpiCard({ title, value, change }: { title: string; value: string; change: number }) {
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';
  const changeSign = change >= 0 ? '+' : '';
  return (
    <div className="bg-white shadow rounded p-4 bordered">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className={`text-sm ${changeColor}`}>{changeSign}{change}%</div>
    </div>
  );
}
