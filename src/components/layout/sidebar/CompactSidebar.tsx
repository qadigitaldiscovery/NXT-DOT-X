
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { NavItem, NavCategory } from './types';

interface CompactSidebarProps {
  topLevelItems: NavItem[];
  categoriesItems: NavCategory[];
  footerItem: NavItem;
}

export const CompactSidebar = ({ 
  topLevelItems, 
  categoriesItems, 
  footerItem 
}: CompactSidebarProps) => {
  return (
    <>
      <div className="hidden md:flex flex-col items-center py-4 space-y-6">
        {/* Top level nav items first */}
        {topLevelItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "w-10 h-10 flex items-center justify-center rounded-md",
              isActive 
                ? "bg-sidebar-primary text-white" 
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
            title={item.label}
          >
            <item.icon className="h-5 w-5" />
          </NavLink>
        ))}
        
        {/* Then all the category items flattened */}
        {categoriesItems.flatMap(category => 
          category.items.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "w-10 h-10 flex items-center justify-center rounded-md",
                isActive 
                  ? "bg-sidebar-primary text-white" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </NavLink>
          ))
        )}
      </div>

      {/* Settings icon for collapsed state */}
      <div className="hidden md:flex justify-center p-4 border-t border-sidebar-border">
        <NavLink
          to={footerItem.path}
          className={({ isActive }) => cn(
            "w-10 h-10 flex items-center justify-center rounded-md",
            isActive 
              ? "bg-sidebar-primary text-white" 
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
          title={footerItem.label}
        >
          <footerItem.icon className="h-5 w-5" />
        </NavLink>
      </div>
    </>
  );
};
