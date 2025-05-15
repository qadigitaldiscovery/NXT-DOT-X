
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
// Fixed import - using named export instead of default
import { SidebarItem } from './SidebarItem';
import { NavItem } from './types';

interface SidebarNavListProps {
  items: NavItem[];
  userRole?: string;
  expandedItems?: string[];
  onToggleExpand?: (label: string) => void;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
}

export const SidebarNavList = ({
  items,
  userRole,
  expandedItems = [],
  onToggleExpand = () => {},
  textColor = 'text-blue-200',
  textHoverColor = 'hover:text-blue-300',
  activeBgColor = 'bg-gradient-to-r from-blue-800 to-indigo-700',
  activeTextColor = 'text-white',
  hoverBgColor = 'hover:bg-indigo-900/50'
}: SidebarNavListProps) => {
  const location = useLocation();
  
  // Function to check if an item should be shown based on user role
  const shouldShowItem = (item: NavItem) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!userRole) return false;
    return item.roles.includes(userRole);
  };
  
  // Function to check if an item is active
  const isItemActive = (item: NavItem) => {
    const path = item.href || item.path || '';
    
    // Custom active pattern matching if provided
    if (item.activeMatchPattern) {
      if (typeof item.activeMatchPattern === 'string') {
        return location.pathname.includes(item.activeMatchPattern);
      } else if (item.activeMatchPattern instanceof RegExp) {
        return item.activeMatchPattern.test(location.pathname);
      }
    }
    
    return location.pathname === path || 
      (path !== '/' && path !== '' && location.pathname.startsWith(path));
  };

  const handleItemToggle = (item: NavItem) => {
    if (item.children && onToggleExpand) {
      onToggleExpand(item.label);
    }
  };

  return (
    <div className="space-y-1">
      {items.filter(shouldShowItem).map((item, index) => {
        const isExpanded = expandedItems.includes(item.label);
        
        // Fixed by changing onClick to onItemClick prop to match SidebarItem interface
        return (
          <SidebarItem
            key={`${item.label}-${index}`}
            item={item}
            isActive={isItemActive(item)}
            onItemClick={() => handleItemToggle(item)} 
            hasChildren={item.children && item.children.length > 0}
            isExpanded={isExpanded}
            textColor={textColor}
            textHoverColor={textHoverColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
          />
        );
      })}
    </div>
  );
};
