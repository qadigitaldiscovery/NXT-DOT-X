import React from 'react';
import { NavItem, NavCategory, SidebarNavListProps } from './types';
import { SidebarItem } from './SidebarItem';
import { useLocation } from 'react-router-dom';

export const SidebarNavList = ({
  navItems = [],
  items = [],
  userRole,
  expandedItems,
  onToggleExpand,
  textColor,
  textHoverColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor
}: SidebarNavListProps) => {
  const location = useLocation();
  
  // Function to check if a menu item should be shown based on user role
  const shouldShowItem = (item: NavItem) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!userRole) return false;
    return item.roles.includes(userRole);
  };

  // Function to check if an item is active
  const isItemActive = (item: NavItem) => {
    const path = item.path || item.href || '';
    if (item.activeMatchPattern) {
      if (typeof item.activeMatchPattern === 'string') {
        return location.pathname.includes(item.activeMatchPattern);
      } else {
        return item.activeMatchPattern.test(location.pathname);
      }
    }
    return location.pathname === path || 
      (path !== '/' && path !== '' && location.pathname.startsWith(path));
  };

  // If navItems is provided, use the category structure
  if (navItems && navItems.length > 0) {
    return (
      <div className="space-y-6">
        {navItems.map((category) => (
          <div key={category.name}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {category.name}
            </h2>
            <div className="space-y-1">
              {category.items.map((item) => 
                shouldShowItem(item) && (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    isActive={isItemActive(item)}
                    onClick={() => item.children?.length && onToggleExpand(item.label)}
                    textColor={textColor}
                    textHoverColor={textHoverColor}
                    activeBgColor={activeBgColor}
                    activeTextColor={activeTextColor}
                    hoverBgColor={hoverBgColor}
                    hasChildren={!!item.children?.length}
                    isExpanded={expandedItems.includes(item.label)}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Otherwise, use the flat items list
  return (
    <div className="space-y-1">
      {items.map((item) => 
        shouldShowItem(item) && (
          <SidebarItem
            key={item.label}
            item={item}
            isActive={isItemActive(item)}
            onClick={() => item.children?.length && onToggleExpand(item.label)}
            textColor={textColor}
            textHoverColor={textHoverColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
            hasChildren={!!item.children?.length}
            isExpanded={expandedItems.includes(item.label)}
          />
        )
      )}
    </div>
  );
};
