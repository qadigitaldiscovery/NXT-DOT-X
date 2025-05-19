
import React from 'react';
import { MainSidebar } from '@/components/layout/sidebar/MainSidebar';
import { NavCategory } from '@/components/layout/sidebar/types';
import { masterDashItem } from '@/components/layout/sidebar/NavigationConfig';
import { SharedNavbar } from '@/components/layout/SharedNavbar';
import { useLocation } from 'react-router-dom';

interface PlatformLayoutProps {
  children: React.ReactNode;
  navItems?: any[];
  navCategories?: NavCategory[];
  items?: any[];
  className?: string;
  showTopLeftToggle?: boolean;
  removeBottomToggle?: boolean;
  initialSidebarState?: 'expanded' | 'collapsed';
  onSidebarStateChange?: (state: 'expanded' | 'collapsed') => void;
  moduleTitle?: string;
  useGlobalNavigation?: boolean;
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({
  children,
  navItems = [],
  navCategories = [],
  items = [],
  className,
  showTopLeftToggle = false,
  removeBottomToggle = true,
  initialSidebarState,
  onSidebarStateChange,
  moduleTitle,
  useGlobalNavigation = false
}) => {
  const location = useLocation();
  
  return (
    <div className="flex h-screen flex-col">
      <SharedNavbar onMenuClick={() => {}} moduleTitle={moduleTitle} />
      <div className="flex flex-1 overflow-hidden">
        <MainSidebar
          navItems={navItems}
          navCategories={navCategories}
          items={items}
          className={className}
          showToggleButton={showTopLeftToggle}
          removeBottomToggle={removeBottomToggle}
          initialState={initialSidebarState}
          onStateChange={onSidebarStateChange}
          homeItem={masterDashItem}
          useGlobalNavigation={useGlobalNavigation}
        />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
