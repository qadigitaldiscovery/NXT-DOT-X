
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
    <div className="hidden md:flex flex-col items-center pt-6 space-y-5">
      {allItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            cn(
              'w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all duration-300',
              isActive 
                ? `${activeBgColor} ${activeTextColor} shadow-md shadow-blue-900/50` 
                : `${textColor} ${hoverBgColor} hover:scale-105`
            )
          }
          title={item.label}
        >
          <item.icon className="h-5 w-5 mb-1" />
          <span className="text-[9px] font-medium opacity-80">{item.label.split(' ')[0]}</span>
        </NavLink>
      ))}
    </div>
  );
};
