
import React, { ReactNode } from 'react';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';
import { Sidebar } from '@/components/layout/sidebar'; // Importing named export instead of default
import Topbar from '@/components/layouts/Topbar';

export interface PlatformLayoutProps {
  children: ReactNode;
  navItems?: NavItem[];
  navCategories?: NavCategory[];
  customFooterContent?: ReactNode;
  removeBottomToggle?: boolean;
  showTopLeftToggle?: boolean;
  moduleTitle?: string; // Add moduleTitle prop
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({
  children,
  navItems = [],
  navCategories = [],
  customFooterContent,
  removeBottomToggle = false,
  showTopLeftToggle = true,
  moduleTitle = '',
}) => {
  return (
    <div className="flex h-screen bg-blue-lightest dark:bg-gray-900">
      <Sidebar
        navItems={navItems}
        navCategories={navCategories}
        customFooterContent={customFooterContent}
        removeBottomToggle={removeBottomToggle}
        showToggleButton={showTopLeftToggle}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar moduleTitle={moduleTitle} />
        <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white to-blue-lightest">
          {children}
        </main>
      </div>
    </div>
  );
};
