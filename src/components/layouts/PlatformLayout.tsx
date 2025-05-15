import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';

interface PlatformLayoutProps {
  children: React.ReactNode;
  moduleTitle?: string;
  navCategories?: NavCategory[];
  customFooterContent?: React.ReactNode;
  removeBottomToggle?: boolean;
  showTopLeftToggle?: boolean;
  homeItem?: NavItem;
}

export const PlatformLayout = ({
  children,
  moduleTitle = '',
  navCategories = [],
  customFooterContent,
  removeBottomToggle = false,
  showTopLeftToggle = false,
  homeItem,
}: PlatformLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navItems={navCategories}
        homeItem={homeItem}
        removeBottomToggle={removeBottomToggle}
        customFooterContent={customFooterContent}
      />
      <div className="flex flex-col flex-1">
        <Topbar
          moduleTitle={moduleTitle}
          showTopLeftToggle={showTopLeftToggle}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
 