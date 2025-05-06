
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { ArrowDownUp, Settings } from 'lucide-react';

export const Beta3Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout
      title="Beta 3"
      navItems={[
        { title: 'Dashboard', href: '/beta3', icon: 'layout-dashboard' },
        { title: 'Settings', href: '/beta3/settings', icon: 'settings' }
      ]}
    >
      {children}
    </DashboardLayout>
  );
};
