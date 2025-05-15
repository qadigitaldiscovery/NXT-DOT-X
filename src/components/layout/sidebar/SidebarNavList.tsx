
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarNavListProps, NavItem } from './types';

export const SidebarNavList: React.FC<SidebarNavListProps> = ({
  items = [],
  textColor = 'text-gray-200',
  textHoverColor = 'hover:text-white',
  activeBgColor = 'bg-blue-700',
  activeTextColor = 'text-white',
  iconColor,
  userRole,
  expandedItems = [],
  onToggleExpand = () => {},
  hoverBgColor = 'hover:bg-gray-700'
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if the user has the required role to view this item
  const hasRequiredRole = (itemRoles?: string[]) => {
    if (!itemRoles || itemRoles.length === 0) return true;
    if (!userRole) return false;
    return itemRoles.includes(userRole);
  };

  const renderNavItem = (item: NavItem) => {
    // Skip items that the user doesn't have permission to see
    if (item.roles && !hasRequiredRole(item.roles)) return null;
    
    const isActive = currentPath === item.href;
    
    return (
      <li key={item.href} className="mb-1">
        <NavLink
          to={item.href}
          className={({ isActive }) => cn(
            "flex items-center px-3 py-2 rounded-md transition-colors",
            textColor,
            textHoverColor,
            hoverBgColor,
            isActive && `${activeBgColor} ${activeTextColor}`
          )}
        >
          {typeof item.icon === 'function' ? (
            <item.icon className={cn("mr-2 h-5 w-5", iconColor)} />
          ) : (
            <span className="mr-2">{item.icon}</span>
          )}
          <span>{item.label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <ul className="space-y-1">
      {items.map(renderNavItem)}
    </ul>
  );
};
