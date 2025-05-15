import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { NavItem } from '@/components/layout/sidebar/types';

interface PlatformLayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  homeItem?: NavItem;
  removeBottomToggle?: boolean;
  customFooterContent?: React.ReactNode;
}

export const PlatformLayout = ({
  children,
  navItems = [],
  homeItem,
  removeBottomToggle = false,
  customFooterContent
}: PlatformLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navItems={navItems}
        homeItem={homeItem}
        removeBottomToggle={removeBottomToggle}
        customFooterContent={customFooterContent}
      />
      <div className="flex flex-col flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
