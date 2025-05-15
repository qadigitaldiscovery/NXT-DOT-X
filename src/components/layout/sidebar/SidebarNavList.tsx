
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
    
    // Use href property with path as fallback for backwards compatibility
    const to = item.href || item.path || '#';
    const isActive = currentPath === to;
    
    // Handle icon rendering safely
    const renderIcon = () => {
      if (typeof item.icon === 'function') {
        const IconComponent = item.icon;
        return <IconComponent className={cn("mr-2 h-5 w-5", iconColor)} />;
      } else if (React.isValidElement(item.icon)) {
        return <span className="mr-2">{item.icon}</span>;
      }
      return null;
    };
    
    return (
      <li key={to} className="mb-1">
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            "flex items-center px-3 py-2 rounded-md transition-colors",
            textColor,
            textHoverColor,
            hoverBgColor,
            isActive && `${activeBgColor} ${activeTextColor}`
          )}
        >
          {renderIcon()}
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

export default SidebarNavList;
