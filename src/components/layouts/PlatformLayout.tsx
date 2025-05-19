
import React, { useState } from 'react';
import { MainSidebar } from '@/components/layout/sidebar/MainSidebar/MainSidebar';
import { NavCategory } from '@/components/layout/sidebar/types';
import { masterDashItem } from '@/components/layout/sidebar/NavigationConfig';
import { SharedNavbar } from '@/components/layout/SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

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
  initialSidebarState = 'expanded',
  onSidebarStateChange,
  moduleTitle,
  useGlobalNavigation = false
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen flex-col">
      <SharedNavbar 
        onMenuClick={toggleSidebar} 
        moduleTitle={moduleTitle} 
      />
      <div className="flex flex-1 overflow-hidden">
        <MainSidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
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
