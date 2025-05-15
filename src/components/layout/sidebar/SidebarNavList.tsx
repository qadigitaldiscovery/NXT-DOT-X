
import React from 'react';
import { NavCategory, NavItem } from './types';
import { SidebarItem } from './SidebarItem';
import { cn } from '@/lib/utils';

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
  textColor = "text-gray-600",
  textHoverColor = "hover:text-gray-900",
  activeBgColor = "bg-gray-100",
  activeTextColor = "text-gray-900",
  hoverBgColor = "hover:bg-gray-50",
  expandedCategories = [],
  onCategoryToggle,
  expandedItems,
  onToggleExpand
}: SidebarNavListProps) {

  // If items are provided but no categories, create a default category
  const allCategories = categories.length > 0 ? categories : 
    items.length > 0 ? [{
      name: 'default',
      label: 'Navigation',
      items: items
    }] : [];
  
  if (allCategories.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("space-y-4", isCollapsed && "items-center")}>
      {allCategories.map((category) => {
        const isExpanded = expandedCategories.includes(category.name || '') || 
                          (expandedItems && category.label && expandedItems.includes(category.label));
        
        return (
          <div key={category.name || category.label} className="space-y-1">
            {!isCollapsed && (
              <h3 
                className={cn(
                  "flex items-center justify-between text-sm font-medium px-3 py-1.5 rounded-md cursor-pointer",
                  textColor, 
                  textHoverColor
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
                {category.items && category.items.length > 0 && (
                  <span className={cn("transform transition-transform", isExpanded ? "rotate-180" : "")}>
                    ▼
                  </span>
                )}
              </h3>
            )}
            
            {(!isCollapsed || !onCategoryToggle) && (isExpanded || !onCategoryToggle) && category.items && (
              <div className="pt-1 pl-1">
                {category.items.map((item) => {
                  const isActive = activeItemKey === item.path || activeItemKey === item.label;
                  
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
                      onClick={() => onItemClick && onItemClick(item.path || item.label)}
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
