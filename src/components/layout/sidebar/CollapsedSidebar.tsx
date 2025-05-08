
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
};

type NavCategory = {
  name: string;
  items: NavItem[];
};

interface CollapsedSidebarProps {
  navItems: NavCategory[];
  textColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
}

export const CollapsedSidebar = ({
  navItems,
  textColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor
}: CollapsedSidebarProps) => {
  // Flatten all items for collapsed view
  const allItems = navItems.flatMap(category => 
    category.items.flatMap(item => 
      item.children ? [item, ...item.children] : [item]
    )
  );

  return (
    <div className="hidden md:flex flex-col items-center pt-4 space-y-2">
      {allItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            cn(
              'w-12 h-12 flex items-center justify-center rounded-md transition-colors',
              isActive 
                ? `${activeBgColor} ${activeTextColor}` 
                : `${textColor} ${hoverBgColor}`
            )
          }
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
        </NavLink>
      ))}
    </div>
  );
};
