
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavCategory, NavItem } from './types';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface CollapsedSidebarProps {
  navItems: NavCategory[];
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
    const path = item.path || item.href || '';
    if (item.activeMatchPattern) {
      if (typeof item.activeMatchPattern === 'string') {
        return location.pathname.includes(item.activeMatchPattern);
      } else {
        return item.activeMatchPattern.test(location.pathname);
      }
    }
    return location.pathname === path || 
      (path !== '/' && path !== '' && location.pathname.startsWith(path));
  };

  // Collect all items that are not children
  const allItems = navItems.flatMap(category => category.items)
    .filter(item => shouldShowItem(item) && !item.children);
    
  // If homeItem is provided, add it to the bottom
  const displayItems = homeItem ? [...allItems, homeItem] : allItems;

  return (
    <div className="py-4 flex flex-col items-center space-y-2 overflow-y-auto">
      <TooltipProvider delayDuration={300}>
        {displayItems.map((item, index) => {
          const Icon = item.icon;
          const path = item.path || item.href || '#';
          
          // If it's the home item and not the only item, add some spacing before it
          const isHomeItem = item === homeItem && displayItems.length > 1;
          
          return (
            <React.Fragment key={item.label + index}>
              {isHomeItem && <div className="h-4" />}
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={path}
                    className={({ isActive: linkActive }) => cn(
                      "p-2 rounded-lg transition-colors duration-150 flex justify-center",
                      textColor,
                      hoverBgColor,
                      (isItemActive(item) || linkActive) && `${activeBgColor} ${activeTextColor}`
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
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
