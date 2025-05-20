
import React, { useState, useEffect } from 'react';
import { MainSidebar } from '@/components/layout/sidebar/MainSidebar/MainSidebar';
import { NavCategory } from '@/components/layout/sidebar/types';
import { masterDashItem } from '@/components/layout/sidebar/NavigationConfig';
import { SharedNavbar } from '@/components/layout/SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar/index';

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

// Separate inner content component that uses sidebar hooks
const PlatformLayoutContent: React.FC<PlatformLayoutProps> = ({
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

  // Update sidebar state when mobile status changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    
    if (onSidebarStateChange) {
      onSidebarStateChange(sidebarOpen ? 'collapsed' : 'expanded');
    }
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
          initialState={initialSidebarState as "expanded" | "collapsed"}
          onStateChange={onSidebarStateChange}
          homeItem={masterDashItem}
          useGlobalNavigation={useGlobalNavigation}
        />
        <main className={cn(
          "flex-1 overflow-auto p-4",
          "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export const PlatformLayout: React.FC<PlatformLayoutProps> = (props) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <PlatformLayoutContent {...props} />
    </SidebarProvider>
  );
};
