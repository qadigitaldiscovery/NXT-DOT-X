
import React from 'react';
import KpiCard from './KpiCard';

const DashboardV2 = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <KpiCard title="Active Projects" value="12" change={5} />
      <KpiCard title="Overdue Tasks" value="3" change={-2} />
      <KpiCard title="Team Capacity" value="87%" change={1} />
      <KpiCard title="Budget Variance" value="-8%" change={-1} />
    </div>
  );
};

export default DashboardV2;
