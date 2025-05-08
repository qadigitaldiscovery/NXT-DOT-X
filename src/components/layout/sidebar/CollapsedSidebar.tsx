
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem, NavCategory } from './types';

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
  return (
    <div className="md:flex flex-col items-center py-4 space-y-4 overflow-y-auto h-full">
      {/* Flattened navigation items */}
      {navItems.flatMap(category => 
        category.items.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.label}
            className={({ isActive }) => cn(
              "w-10 h-10 flex items-center justify-center rounded-md",
              isActive 
                ? `${activeBgColor} ${activeTextColor} shadow-sm shadow-indigo-900/30` 
                : `${textColor} ${hoverBgColor}`
            )}
          >
            <item.icon className="h-5 w-5" />
          </NavLink>
        ))
      )}
      
      {/* Push home to the bottom with flex-grow */}
      <div className="flex-grow"></div>
      
      {/* Home button at the bottom */}
      {homeItem && (
        <NavLink
          to={homeItem.path}
          title={homeItem.label}
          className={({ isActive }) => cn(
            "w-10 h-10 flex items-center justify-center rounded-md mb-2",
            isActive 
              ? `${activeBgColor} ${activeTextColor} shadow-sm shadow-indigo-900/30` 
              : `${textColor} ${hoverBgColor}`
          )}
        >
          <homeItem.icon className="h-5 w-5" />
        </NavLink>
      )}
    </div>
  );
};
