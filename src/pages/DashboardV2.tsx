
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { KpiCard } from '@/components/dashboard-v2/KpiCard';

const DashboardV2 = () => {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard-v2' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Reports', href: '/reports' }
  ];

  return (
    <PlatformLayout 
      navItems={navItems}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Users" value="1,234" change={12} />
          <KpiCard title="Active Sessions" value="56" change={-8} />
          <KpiCard title="Revenue" value="$45,678" change={24} />
          <KpiCard title="Conversion Rate" value="3.2%" change={0.5} />
        </div>
      </div>
    </PlatformLayout>
  );
};

export default DashboardV2;
