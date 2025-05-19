import React from 'react';
import { cn } from '../../../../lib/utils';
import { useIsMobile } from '../../../../hooks/use-mobile';
import { useAuth } from '../../../../context/AuthContext';
import { NavCategory, NavItem, SidebarProps } from '../types';
import { MainSidebarContent } from './MainSidebarContent';
import { MainSidebarBackdrop } from './MainSidebarBackdrop';
import { MainSidebarCollapsed } from './MainSidebarCollapsed';
import { MainSidebarFooter } from './MainSidebarFooter';
import { SidebarToggleButton } from '../SidebarToggleButton';

type MainSidebarProps = Omit<SidebarProps, 'initialState' | 'onStateChange'> & {
  initialState?: 'expanded' | 'collapsed';
  onStateChange?: (state: 'expanded' | 'collapsed') => void;
};

export const MainSidebar: React.FC<MainSidebarProps> = ({
  open,
  onToggle,
  navItems = [],
  navCategories = [],
  items = [],
  homeItem,
  className,
  removeBottomToggle = false,
  showToggleButton = true,
  initialState,
  onStateChange,
  useGlobalNavigation = true
}) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const [internalOpen, setInternalOpen] = React.useState(() => {
    if (initialState) {
      return initialState === 'expanded';
    }
    return true;
  });
  
  const isOpen = open !== undefined ? open : internalOpen;
  
  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
    
    if (onStateChange) {
      onStateChange(isOpen ? 'collapsed' : 'expanded');
    }
  };

  const sidebarBgColor = className || 'bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950';
  
  return (
    <>
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
        <MainSidebarContent 
          isOpen={isOpen} 
          navCategories={navCategories}
          navItems={navItems}
          items={items}
          user={user ? { role: user.role } : undefined}
          useGlobalNavigation={useGlobalNavigation}
        />

        {!isOpen && !isMobile && (
          <MainSidebarCollapsed 
            navCategories={navCategories}
            navItems={navItems}
            items={items}
            homeItem={homeItem}
            useGlobalNavigation={useGlobalNavigation}
          />
        )}

        <MainSidebarFooter />
      </aside>

      {!removeBottomToggle && showToggleButton && (
        <SidebarToggleButton 
          open={isOpen} 
          onToggle={toggleSidebar} 
        />
      )}
    </>
  );
};
