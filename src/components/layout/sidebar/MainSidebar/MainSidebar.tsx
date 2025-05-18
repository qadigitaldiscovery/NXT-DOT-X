
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { NavCategory } from '@/components/layout/sidebar/types';
import { MainSidebarContent } from './MainSidebarContent';
import { MainSidebarBackdrop } from './MainSidebarBackdrop';
import { MainSidebarCollapsed } from './MainSidebarCollapsed';
import { MainSidebarFooter } from './MainSidebarFooter';
import { SidebarToggleButton } from '@/components/layout/sidebar/SidebarToggleButton';

interface MainSidebarProps {
  open?: boolean;
  onToggle?: () => void;
  navItems?: any[];
  navCategories?: NavCategory[];
  items?: any[];
  homeItem?: any;
  customFooterContent?: React.ReactNode;
  className?: string;
  removeBottomToggle?: boolean;
  showToggleButton?: boolean;
  initialState?: 'expanded' | 'collapsed';
  onStateChange?: (state: 'expanded' | 'collapsed') => void;
  useGlobalNavigation?: boolean;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({
  open,
  onToggle,
  navItems = [],
  navCategories = [],
  items = [],
  homeItem,
  customFooterContent,
  className,
  removeBottomToggle = false,
  showToggleButton = true,
  initialState,
  onStateChange,
  useGlobalNavigation = true
}) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Use provided open/onToggle or internal state
  const [internalOpen, setInternalOpen] = React.useState(() => {
    // Initialize with initialState if provided
    if (initialState) {
      return initialState === 'expanded';
    }
    return true;
  });
  
  const isOpen = open !== undefined ? open : internalOpen;
  
  const toggleSidebar = () => {
    // Call the provided onToggle without arguments
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
    
    // Call onStateChange with the new state if provided
    if (onStateChange) {
      onStateChange(isOpen ? 'collapsed' : 'expanded');
    }
  };

  // Updated styling with more reasonable sizing
  const sidebarBgColor = className || 'bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950';
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && isMobile && (
        <MainSidebarBackdrop onToggle={toggleSidebar} />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-xl flex flex-col transition-all duration-300 ease-in-out",
          sidebarBgColor,
          isOpen ? "w-72" : "w-0 md:w-16",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0"
        )}
      >
        {/* Full Navigation List (Visible when open) */}
        <MainSidebarContent 
          isOpen={isOpen} 
          navCategories={navCategories}
          navItems={navItems}
          items={items}
          user={user}
          useGlobalNavigation={useGlobalNavigation}
        />

        {/* Icon-Only Navigation (Visible when collapsed on desktop) */}
        {!isOpen && !isMobile && (
          <MainSidebarCollapsed 
            navCategories={navCategories}
            navItems={navItems}
            items={items}
            homeItem={homeItem}
            useGlobalNavigation={useGlobalNavigation}
          />
        )}

        {/* Quick access buttons at bottom */}
        <MainSidebarFooter />
      </aside>

      {/* Bottom sidebar toggle button (if not removed) */}
      {!removeBottomToggle && showToggleButton && (
        <SidebarToggleButton 
          open={isOpen} 
          onToggle={toggleSidebar} 
        />
      )}
    </>
  );
};
