
import React from 'react';
import KpiCard from './KpiCard';

const DashboardV2 = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard V2</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard title="Active Projects" value={12} change={5} />
        <KpiCard title="Overdue Tasks" value={3} change={-2} />
        <KpiCard title="Team Capacity" value="87%" change={1} />
        <KpiCard title="Budget Variance" value="-8%" change={-1} />
      </div>
    </div>
  );
};

export default DashboardV2;
