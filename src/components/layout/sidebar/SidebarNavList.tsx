
import React from 'react';
import { NavCategory, NavItem } from './types';
import { SidebarItem } from './SidebarItem';
import { cn } from '@/lib/utils';

interface SidebarNavListProps {
  categories: NavCategory[];
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
}

export function SidebarNavList({
  categories,
  activeItemKey,
  onItemClick,
  isCollapsed,
  textColor = "text-gray-600",
  textHoverColor = "hover:text-gray-900",
  activeBgColor = "bg-gray-100",
  activeTextColor = "text-gray-900",
  hoverBgColor = "hover:bg-gray-50",
  expandedCategories = [],
  onCategoryToggle
}: SidebarNavListProps) {

  if (!categories || categories.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("space-y-4", isCollapsed && "items-center")}>
      {categories.map((category) => {
        const isExpanded = expandedCategories.includes(category.name);
        
        return (
          <div key={category.name} className="space-y-1">
            {!isCollapsed && (
              <h3 
                className={cn(
                  "flex items-center justify-between text-sm font-medium px-3 py-1.5 rounded-md cursor-pointer",
                  textColor, 
                  textHoverColor
                )}
                onClick={() => onCategoryToggle && onCategoryToggle(category.name)}
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
