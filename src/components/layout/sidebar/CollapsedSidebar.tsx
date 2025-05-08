
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
  // Flatten all items for collapsed view, but separate the Home item
  const allItems: NavItem[] = [];
  const homeItem: NavItem | undefined = navItems.flatMap(category => 
    category.items.find(item => item.label === 'Home')
  ).filter(Boolean)[0];
  
  // Get all other items except Home
  navItems.forEach(category => {
    category.items.forEach(item => {
      if (item.label !== 'Home') {
        allItems.push(item);
        if (item.children) {
          item.children.forEach(child => allItems.push(child));
        }
      }
    });
  });

  return (
    <div className="hidden md:flex flex-col items-center pt-6 space-y-5 h-full">
      <div className="flex-1 flex flex-col items-center gap-5">
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
      
      {/* Home button at the bottom */}
      {homeItem && (
        <div className="mt-auto mb-4">
          <NavLink
            key={homeItem.path}
            to={homeItem.path}
            end
            className={({ isActive }) =>
              cn(
                'w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all duration-300',
                isActive 
                  ? `${activeBgColor} ${activeTextColor} shadow-md shadow-blue-900/50` 
                  : `${textColor} ${hoverBgColor} hover:scale-105`
              )
            }
            title={homeItem.label}
          >
            <homeItem.icon className="h-5 w-5 mb-1" />
            <span className="text-[9px] font-medium opacity-80">{homeItem.label}</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};
