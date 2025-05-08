
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
    <div className="hidden md:flex flex-col items-center pt-10 space-y-7">
      {allItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            cn(
              'w-20 h-20 flex flex-col items-center justify-center rounded-lg transition-all duration-300',
              isActive 
                ? `${activeBgColor} ${activeTextColor} shadow-lg shadow-blue-500/25 scale-110` 
                : `${textColor} ${hoverBgColor} hover:scale-105`
            )
          }
          title={item.label}
        >
          <item.icon className="h-9 w-9 mb-1" />
          <span className="text-xs font-medium mt-1 opacity-80">{item.label.split(' ')[0]}</span>
        </NavLink>
      ))}
    </div>
  );
};
