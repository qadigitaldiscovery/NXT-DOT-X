import React, { ReactNode, useState } from 'react';
import { MainSidebar } from '@/components/layout/sidebar/MainSidebar';
import { Topbar } from './Topbar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PlatformLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
  fullWidth?: boolean;
  className?: string;
  showSidebar?: boolean;
  sidebarState?: 'expanded' | 'collapsed';
}

export function PlatformLayout({ 
  children, 
  hideNavigation = false, 
  fullWidth = false,
  className,
  showSidebar = true,
  sidebarState = 'expanded'
}: PlatformLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(
    // If we're on mobile, start with closed sidebar
    // Otherwise use the prop or default to expanded
    !isMobile && (sidebarState === 'expanded')
  );

  // Always hide the sidebar if hideNavigation is true
  const shouldShowSidebar = !hideNavigation && showSidebar;

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sidebar state changes from within the sidebar component
  const handleSidebarStateChange = (state: 'expanded' | 'collapsed') => {
    setSidebarOpen(state === 'expanded');
  };

  return (
    <div className={cn(
      "flex min-h-screen bg-gray-100 dark:bg-gray-900",
      className
    )}>
      {shouldShowSidebar && (
        <MainSidebar 
          open={sidebarOpen}
          onToggle={handleSidebarToggle}
          initialState={sidebarState}
          onStateChange={handleSidebarStateChange}
        />
      )}
      
      <div className={cn(
        "flex flex-col w-full overflow-x-hidden",
        shouldShowSidebar && !isMobile && sidebarOpen && "lg:ml-64"
      )}>
        {!hideNavigation && (
          <Topbar onMenuClick={handleSidebarToggle} />
        )}
        
        <main className={cn(
          "flex-1",
          !fullWidth && "container mx-auto",
          !hideNavigation && "py-6"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
