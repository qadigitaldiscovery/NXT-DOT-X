
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';
import { navCategories as globalNavCategories } from '@/components/layout/sidebar/NavigationConfig';
import { cn } from '@/lib/utils';

interface MainSidebarCollapsedProps {
  navCategories: NavCategory[];
  navItems: NavItem[];
  items: NavCategory[];
  homeItem?: NavItem;
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
  const navigate = useNavigate();

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

  // Check if item is active
  const isItemActive = (item: NavItem): boolean => {
    const path = item.href || item.path || '';
    if (item.activeMatchPattern) {
      if (typeof item.activeMatchPattern === 'string') {
        return location.pathname.includes(item.activeMatchPattern);
      } else if (item.activeMatchPattern instanceof RegExp) {
        return item.activeMatchPattern.test(location.pathname);
      }
    }
    
    return location.pathname === path || 
      (path !== '/' && path !== '' && location.pathname.startsWith(path));
  };

  // Handle item click
  const handleItemClick = (item: NavItem) => {
    console.log("Collapsed sidebar - clicking item:", item.path || item.href);
    if (item.path || item.href) {
      navigate(item.path || item.href || '/');
    }
    
    // Handle custom onClick if provided
    if ('onClick' in item && typeof item.onClick === 'function') {
      item.onClick();
    }
  };

  // Flatten all items for icon-only display
  const allItems = effectiveNavCategories.flatMap(cat => cat.items);

  return (
    <div className="flex flex-col items-center p-4 h-full bg-gradient-to-b from-redmetal-800 to-black">
      {/* Home item if provided */}
      {homeItem && (
        <Button
          variant="ghost"
          className={cn(
            "w-10 h-10 p-0 mb-4 text-blue-100 hover:text-white hover:bg-blue-900/50",
            isItemActive(homeItem) && "bg-blue-800/50 text-white"
          )}
          onClick={() => handleItemClick(homeItem)}
        >
          {homeItem.icon && <homeItem.icon className="h-5 w-5" />}
        </Button>
      )}

      {/* All items as icons */}
      <div className="flex flex-col items-center space-y-2">
        {allItems.map((item, index) => (
          <Button
            key={`collapsed-${item.label}-${index}`}
            variant="ghost"
            className={cn(
              "w-10 h-10 p-0 text-blue-100 hover:text-white hover:bg-blue-900/50",
              isItemActive(item) && "bg-blue-800/50 text-white"
            )}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
            <span className="sr-only">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
