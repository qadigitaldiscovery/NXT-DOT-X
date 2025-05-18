import React from 'react';
import { NavCategory, NavItem } from './types';
import { SidebarItem } from './SidebarItem';
import { cn } from '../../../lib/utils';

interface SidebarNavListProps {
  categories?: NavCategory[];
  items?: NavItem[];
  activeItemKey?: string;
  onItemClick?: (key: string) => void;
  isCollapsed?: boolean;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
  expandedCategories?: string[];
  onCategoryToggle?: (categoryName: string) => void;
  userRole?: string;
  expandedItems?: string[];
  onToggleExpand?: (label: string) => void;
}

export function SidebarNavList({
  categories = [],
  items = [],
  activeItemKey,
  onItemClick,
  isCollapsed,
  textColor = "text-gray-700",
  textHoverColor = "hover:text-gray-900",
  activeBgColor = "bg-gray-100",
  activeTextColor = "text-gray-900",
  hoverBgColor = "hover:bg-gray-50",
  expandedCategories = [],
  onCategoryToggle,
  userRole,
  expandedItems,
  onToggleExpand
}: SidebarNavListProps) {

  // Check if an item or any of its children has the active path
  const isItemActive = (item: NavItem): boolean => {
    if (activeItemKey === item.path || activeItemKey === item.href) {
      return true;
    }

    // Check children if they exist
    if (item.children && item.children.length > 0) {
      return item.children.some(child => isItemActive(child));
    }

    return false;
  };

  // If items are provided but no categories, create a default category
  const allCategories = categories.length > 0 ? categories : 
    items.length > 0 ? [{
      name: 'default',
      label: 'Navigation',
      items: items
    }] : [];
  
  // Filter items that the user has access to based on their role
  const filterItemsByRole = (items: NavItem[], role?: string): NavItem[] => {
    if (!role) return items;
    
    return items.filter(item => {
      // If no roles specified, everyone can see it
      if (!item.roles || item.roles.length === 0) return true;
      
      // Otherwise, check if user role is in the allowed roles
      return item.roles.includes(role);
    });
  };
  
  // Process categories to filter items based on user role
  const processedCategories = allCategories.map(category => ({
    ...category,
    items: filterItemsByRole(category.items, userRole)
  })).filter(category => category.items.length > 0); // Remove empty categories
  
  if (processedCategories.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("space-y-6", isCollapsed && "items-center")}>
      {processedCategories.map((category) => {
        const isExpanded = expandedCategories.includes(category.name || '') || 
                          (expandedItems && category.label && expandedItems.includes(category.label));
        
        return (
          <div key={category.name || category.label} className="space-y-2">
            {!isCollapsed && (
              <h3 
                className={cn(
                  "flex items-center justify-between text-sm font-semibold px-3 py-2 text-gray-900 uppercase tracking-wider",
                  "border-b border-gray-200"
                )}
                onClick={() => {
                  if (onCategoryToggle && category.name) {
                    onCategoryToggle(category.name);
                  } else if (onToggleExpand && category.label) {
                    onToggleExpand(category.label);
                  }
                }}
              >
                {category.label || category.name}
              </h3>
            )}
            
            {(!isCollapsed || !onCategoryToggle) && (isExpanded || !onCategoryToggle) && category.items && (
              <div className="pl-3 space-y-1">
                {category.items.map((item) => {
                  const isActive = isItemActive(item);
                  
                  return (
                    <SidebarItem
                      key={item.label}
                      item={item}
                      isActive={isActive}
                      textColor={textColor}
                      textHoverColor={textHoverColor}
                      activeBgColor={activeBgColor}
                      activeTextColor={activeTextColor}
                      hoverBgColor={hoverBgColor}
                      onClick={() => onItemClick && onItemClick(item.path || item.href || item.label)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
