import React, { ReactNode, memo, useCallback } from 'react';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layouts/Topbar';
import { navCategories as globalNavCategories } from '@/components/layout/sidebar/NavigationConfig';

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
  useGlobalNavigation?: boolean;
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
  useGlobalNavigation = true,
}) => {
  // Memoize the handler to prevent re-renders and adapt the function signature
  const handleSidebarToggle = useCallback(() => {
    if (onSidebarStateChange) {
      // Toggle the state - if it was 'expanded', make it 'collapsed' and vice versa
      const newState = initialSidebarState === 'expanded' ? 'collapsed' : 'expanded';
      onSidebarStateChange(newState);
    }
  }, [onSidebarStateChange, initialSidebarState]);

  // Use provided navigation or fall back to global navigation
  const navigationCategories = navCategories.length > 0 
    ? navCategories 
    : (useGlobalNavigation ? globalNavCategories : []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        navItems={navItems}
        navCategories={navigationCategories}
        customFooterContent={customFooterContent}
        removeBottomToggle={removeBottomToggle}
        showToggleButton={showTopLeftToggle}
        open={initialSidebarState === 'expanded'}
        onToggle={handleSidebarToggle}
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
