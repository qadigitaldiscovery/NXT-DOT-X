
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem, NavCategory } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/context/AuthContext';

interface CollapsedSidebarProps {
  navItems: NavCategory[];
  textColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
  homeItem?: NavItem;
}

export const CollapsedSidebar: React.FC<CollapsedSidebarProps> = ({
  navItems,
  textColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor,
  homeItem
}) => {
  const location = useLocation();
  const { user } = useAuth();

  // Flatten all navigation items
  const flattenedItems = React.useMemo(() => {
    const items: NavItem[] = [];
    
    // Add home item if provided
    if (homeItem) {
      items.push(homeItem);
    }
    
    // Add items from categories
    navItems.forEach(category => {
      category.items.forEach(item => {
        // Only include items that the user has permission to see
        if (!item.roles || item.roles.includes(user?.role || '')) {
          items.push(item);
        }
      });
    });
    
    return items;
  }, [navItems, homeItem, user?.role]);

  return (
    <div className="flex flex-col items-center pt-4 space-y-2">
      {flattenedItems.map(item => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <TooltipProvider key={item.path}>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={cn(
                    "w-10 h-10 rounded-md flex items-center justify-center transition-colors",
                    textColor,
                    hoverBgColor,
                    isActive && activeBgColor,
                    isActive && activeTextColor
                  )}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};
