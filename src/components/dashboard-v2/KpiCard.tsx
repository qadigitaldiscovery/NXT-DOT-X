// KpiCard.tsx
import React from 'react';

export default function KpiCard({ title, value, change }) {
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';
  const changeSign = change >= 0 ? '+' : '';
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
      {change != null && (
        <div className={\`text-sm \${changeColor}\`}>
          {changeSign}{change}%
        </div>
      )}
    </div>
  );
}
