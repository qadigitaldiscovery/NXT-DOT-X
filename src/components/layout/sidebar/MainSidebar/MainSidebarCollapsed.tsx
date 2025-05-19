
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CollapsedSidebar } from '@/components/layout/sidebar/CollapsedSidebar';
import { NavCategory } from '@/components/layout/sidebar/types';
import { navCategories as globalNavCategories } from '@/components/layout/sidebar/NavigationConfig';

interface MainSidebarCollapsedProps {
  navCategories: NavCategory[];
  navItems: any[];
  items: any[];
  homeItem?: any;
  useGlobalNavigation: boolean;
}

export const MainSidebarCollapsed: React.FC<MainSidebarCollapsedProps> = ({
  navCategories,
  navItems,
  items,
  homeItem,
  useGlobalNavigation
}) => {
  const location = useLocation();

  // Determine which navigation to use - similar to MainSidebarContent
  let effectiveNavCategories: NavCategory[] = [];
  
  const isDataManagement = location.pathname.startsWith('/data-management');
  
  if (isDataManagement && useGlobalNavigation) {
    effectiveNavCategories = globalNavCategories;
  } else if (useGlobalNavigation) {
    effectiveNavCategories = globalNavCategories;
  } else if (navCategories && navCategories.length > 0) {
    effectiveNavCategories = navCategories;
  } else if (items && items.length > 0) {
    effectiveNavCategories = items;
  } else if (navItems && navItems.length > 0) {
    effectiveNavCategories = [{
      name: 'Navigation',
      label: 'Navigation',
      items: navItems
    }];
  }

  return (
    <CollapsedSidebar 
      navItems={effectiveNavCategories.flatMap(cat => cat.items)}
      textColor="text-blue-200"
      activeBgColor="bg-gradient-to-r from-blue-800 to-indigo-700"
      activeTextColor="text-white"
      hoverBgColor="hover:bg-indigo-900/50"
      homeItem={homeItem}
    />
  );
};
