import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import KpiCard from '@/components/shared/KpiCard';

export default function DashboardV2() {
  return (
    <PlatformLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard title="Revenue" value="$82,000" change={5.2} />
        <KpiCard title="New Users" value="1,234" change={2.8} />
        <KpiCard title="Conversion Rate" value="7.5%" change={-1.4} />
        <KpiCard title="Sessions" value="45,120" change={3.9} />
      </div>
    </PlatformLayout>
  );
}
