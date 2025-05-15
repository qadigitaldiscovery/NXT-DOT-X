import React from 'react';
import KpiCard from '@/components/shared/KpiCard';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';

export default function DashboardV2() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Reports', href: '/reports' },
    { label: 'Users', href: '/users' }
  ];

  return (
    <PlatformLayout navItems={navItems} homeItem={{ label: 'Lovable', href: '/' }}>
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard metric="revenue" label="Revenue" />
        <KpiCard metric="new_users" label="New Users" />
        <KpiCard metric="conversion_rate" label="Conversion Rate" suffix="%" />
        <KpiCard metric="sessions" label="Sessions" />
      </div>
    </PlatformLayout>
  );
}
 