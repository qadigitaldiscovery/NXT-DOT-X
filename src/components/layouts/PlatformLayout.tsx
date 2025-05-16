
import React, { ReactNode, memo, useCallback } from 'react';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';
import { Sidebar } from '@/components/layout/sidebar';
import Topbar from '@/components/layouts/Topbar';

export interface PlatformLayoutProps {
  children: ReactNode;
  navItems?: NavItem[];
  navCategories?: NavCategory[];
  customFooterContent?: ReactNode;
  removeBottomToggle?: boolean;
  showTopLeftToggle?: boolean;
  moduleTitle?: string;
  onSidebarStateChange?: (state: string) => void;
  initialSidebarState?: string;
}

// Use memo to prevent unnecessary re-renders
export const PlatformLayout: React.FC<PlatformLayoutProps> = memo(({
  children,
  navItems = [],
  navCategories = [],
  customFooterContent,
  removeBottomToggle = false,
  showTopLeftToggle = true,
  moduleTitle = '',
  onSidebarStateChange,
  initialSidebarState,
}) => {
  // Memoize the handler to prevent re-renders
  const handleSidebarStateChange = useCallback((state: string) => {
    if (onSidebarStateChange) {
      onSidebarStateChange(state);
    }
  }, [onSidebarStateChange]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        navItems={navItems}
        navCategories={navCategories}
        customFooterContent={customFooterContent}
        removeBottomToggle={removeBottomToggle}
        showToggleButton={showTopLeftToggle}
        initialState={initialSidebarState}
        onStateChange={handleSidebarStateChange}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar moduleTitle={moduleTitle} />
        <main className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
});

// Add a display name for debugging
PlatformLayout.displayName = 'PlatformLayout';
