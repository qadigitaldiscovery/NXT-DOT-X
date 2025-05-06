
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { NavItem } from './types';

interface SidebarFooterProps {
  item: NavItem;
  open: boolean;
}

export const SidebarFooter = ({ item, open }: SidebarFooterProps) => {
  return (
    <div className={cn(
      "p-4 border-t border-sidebar-border",
      !open && "md:hidden"
    )}>
      <NavLink
        to={item.path}
        className={({ isActive }) => cn(
          "flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-primary text-white" 
            : "bg-sidebar-accent text-sidebar-foreground border-sidebar-border hover:bg-sidebar-primary hover:text-white"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>Settings</span>
      </NavLink>
    </div>
  );
};
