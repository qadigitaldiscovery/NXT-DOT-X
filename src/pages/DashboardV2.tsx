
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import KpiCard from '@/components/dashboard-v2/KpiCard';

const DashboardV2 = () => {
  return (
    <div>
      <h1>Dashboard V2</h1>
      <Button>Click me</Button>
      <Card>
        <KpiCard title="Total Revenue" value="$1M" change={10} />
      </Card>
    </div>
  );
};

export default DashboardV2;
