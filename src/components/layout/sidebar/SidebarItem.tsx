
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { NavItem } from './types';

interface SidebarItemProps {
  item: NavItem;
  isCompact?: boolean;
}

export const SidebarItem = ({ item, isCompact = false }: SidebarItemProps) => {
  if (isCompact) {
    return (
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
    );
  }

  return (
    <li key={item.path}>
      <NavLink
        to={item.path}
        className={({ isActive }) => cn(
          "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-primary text-white" 
            : "text-sidebar-foreground hover:bg-sidebar-accent"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
};
