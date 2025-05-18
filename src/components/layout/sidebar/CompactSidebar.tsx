import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { NavCategory, NavItem } from './types';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface CompactSidebarProps {
  categories?: NavCategory[];
  navItems?: NavItem[];
  userRole?: string;
  homeItem?: NavItem;
  textColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
}

export const CompactSidebar = ({ 
  categories,
  navItems,
  homeItem,
  textColor = "text-gray-300",
  activeBgColor = "bg-indigo-500",
  activeTextColor = "text-white",
  hoverBgColor = "hover:bg-indigo-900/50"
}: CompactSidebarProps) => {
  // Prepare items for display
  const allItems = [...(navItems || [])];
  
  // If we have categories, flatten their items
  if (categories && categories.length > 0) {
    categories.forEach(category => {
      allItems.push(...category.items);
    });
  }

  return (
    <div className="flex flex-col items-center py-4 space-y-4">
      {allItems.map((item) => (
        <NavLink
          key={item.path || item.href || item.label}
          to={item.path || item.href || '#'}
          className={({ isActive }) => cn(
            "w-10 h-10 flex items-center justify-center rounded-md",
            isActive 
              ? `${activeBgColor} ${activeTextColor}` 
              : `${textColor} ${hoverBgColor}`
          )}
          title={item.label}
        >
          {item.icon && typeof item.icon === 'function' && <item.icon className="h-5 w-5" />}
        </NavLink>
      ))}
      
      {homeItem && (
        <NavLink
          to={homeItem.path || homeItem.href || '/'}
          className={({ isActive }) => cn(
            "mt-auto w-10 h-10 flex items-center justify-center rounded-md",
            isActive 
              ? `${activeBgColor} ${activeTextColor}` 
              : `${textColor} ${hoverBgColor}`
          )}
          title={homeItem.label}
        >
          {homeItem.icon && typeof homeItem.icon === 'function' && <homeItem.icon className="h-5 w-5" />}
        </NavLink>
      )}
    </div>
  );
};

export default CompactSidebar;
