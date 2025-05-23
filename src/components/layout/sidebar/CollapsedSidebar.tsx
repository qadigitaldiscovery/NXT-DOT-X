import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavCategory, NavItem } from './types';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface CollapsedSidebarProps {
  navItems: NavCategory[] | NavItem[];
  textColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
  homeItem?: NavItem;
}

export const CollapsedSidebar = ({
  navItems,
  textColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor,
  homeItem
}: CollapsedSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Function to check if an item should be shown based on user role
  const shouldShowItem = (item: NavItem) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!user?.role) return false;
    return item.roles.includes(user.role);
  };
  
  // Function to check if an item is active
  const isItemActive = (item: NavItem) => {
    const path = item.href || item.path || '';
    
    // Custom active pattern matching if provided
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

  // Extract all items from navItems, handling both NavItem[] and NavCategory[]
  let allItems: NavItem[] = [];
  
  // Improved detection for item types
  if (navItems.length > 0) {
    // Check if items property exists to determine if it's a NavCategory
    if ('items' in navItems[0]) {
      // It's an array of NavCategory objects
      const categories = navItems as NavCategory[];
      categories.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
          allItems = [...allItems, ...category.items];
        }
      });
    } else {
      // It's an array of NavItem objects
      allItems = navItems as NavItem[];
    }
  }
  
  // Filter items based on role and exclude parent items with children
  const filteredItems = allItems
    .filter(item => shouldShowItem(item) && !(item.children && item.children.length > 0));
    
  // If homeItem is provided, add it to the bottom
  const displayItems = homeItem ? [...filteredItems, homeItem] : filteredItems;

  // Enhanced logging for debugging
  console.log('CollapsedSidebar - User:', {
    id: user?.id,
    username: user?.username,
    role: user?.role,
    permissions: user?.permissions
  });
  console.log('CollapsedSidebar - All items before filtering:', allItems);
  console.log('CollapsedSidebar - Items after role filtering:', filteredItems);
  console.log('CollapsedSidebar - Final display items:', displayItems);

  return (
    <div className="py-4 flex flex-col items-center space-y-2 overflow-y-auto">
      <TooltipProvider delayDuration={300}>
        {displayItems.map((item, index) => {
          // Use href property with path as fallback for backwards compatibility
          const to = item.href || item.path || '#';
          
          // If it's the home item and not the only item, add some spacing before it
          const isHomeItem = item === homeItem && displayItems.length > 1;
          
          // Handle icon rendering safely
          const renderIcon = () => {
            if (typeof item.icon === 'function') {
              const IconComponent = item.icon;
              return <IconComponent className="h-5 w-5" />;
            } else if (React.isValidElement(item.icon)) {
              return item.icon;
            }
            return null;
          };
          
          return (
            <React.Fragment key={item.label + index}>
              {isHomeItem && <div className="h-4" />}
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={to}
                    className={({ isActive: linkActive }) => cn(
                      "p-2 rounded-lg transition-colors duration-150 flex justify-center",
                      textColor,
                      hoverBgColor,
                      (isItemActive(item) || linkActive) && `${activeBgColor} ${activeTextColor}`
                    )}
                  >
                    {renderIcon()}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </React.Fragment>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default CollapsedSidebar;
