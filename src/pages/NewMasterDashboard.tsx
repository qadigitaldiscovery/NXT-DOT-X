import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { UtilityDrawer } from '@/components/layout/UtilityDrawer';
import KpiCard from '@/components/shared/KpiCard';

export default function NewMasterDashboard() {
  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <KpiCard title="Revenue" value="$82,000" change={5.2} />
          <KpiCard title="New Users" value="1,234" change={2.8} />
          <KpiCard title="Conversion Rate" value="7.5%" change={-1.4} />
          <KpiCard title="Sessions" value="45,120" change={3.9} />
        </main>
        <UtilityDrawer />
      </div>
    </div>
  );
}
