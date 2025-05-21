
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

// Updated NavItem interface to match the types file
interface NavItemProps {
  item: {
    label: string;
    path?: string;
    href?: string;
    icon?: React.ElementType; // Updated to ElementType
  };
  isActive: boolean;
  onClick: () => void;
}

export const SidebarNavItem: React.FC<NavItemProps> = ({ item, isActive, onClick }) => {
  const { label, path, href, icon: Icon } = item;
  const itemPath = path || href || '#';
  
  return (
    <NavLink
      to={itemPath}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-blue-800/50 text-white" : "text-blue-100 hover:bg-blue-900/50 hover:text-white"
      )}
      onClick={(e) => {
        if (itemPath === '#') {
          e.preventDefault();
        }
        onClick();
      }}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{label}</span>
    </NavLink>
  );
};
