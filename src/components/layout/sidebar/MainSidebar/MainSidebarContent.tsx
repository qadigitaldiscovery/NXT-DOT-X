import React from 'react';
import { SidebarNavigation } from '@/components/layout/sidebar/SidebarNavigation';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';
import { useLocation } from 'react-router-dom';
import { navCategories as globalNavCategories } from '@/components/layout/sidebar/NavigationConfig';

interface MainSidebarContentProps {
  isOpen: boolean;
  navCategories: NavCategory[];
  navItems: NavItem[];
  items: NavCategory[];
  user: { role?: string } | undefined;
  useGlobalNavigation: boolean;
}

export const MainSidebarContent: React.FC<MainSidebarContentProps> = ({
  isOpen,
  navCategories,
  navItems,
  items,
  user,
  useGlobalNavigation
}) => {
  const location = useLocation();

  // Determine which navigation to use
  let effectiveNavCategories: NavCategory[] = [];

  // Check if we're in a data management route
  const isDataManagement = location.pathname.startsWith('/data-management');
  if (isDataManagement && useGlobalNavigation) {
    // For data management routes, always use global navigation categories
    effectiveNavCategories = globalNavCategories;
    console.log('MainSidebarContent - Using Data Management Navigation');
  } else if (useGlobalNavigation) {
    // Use global navigation categories
    effectiveNavCategories = globalNavCategories;
    console.log('MainSidebarContent - Using Global Navigation');
  } else if (navCategories && navCategories.length > 0) {
    // Use provided navCategories
    effectiveNavCategories = navCategories;
    console.log('MainSidebarContent - Using Provided Nav Categories');
  } else if (items && items.length > 0) {
    // Use provided items (legacy support)
    effectiveNavCategories = items as NavCategory[];
    console.log('MainSidebarContent - Using Legacy Items');
  } else if (navItems && navItems.length > 0) {
    // Create a category from navItems
    effectiveNavCategories = [{
      name: 'Navigation',
      label: 'Navigation',
      items: navItems as NavItem[]
    }];
    console.log('MainSidebarContent - Using Nav Items');
  }
  if (!isOpen) {
    return null;
  }
  return <nav className="">
      <SidebarNavigation categories={effectiveNavCategories} userRole={user?.role} />
    </nav>;
};