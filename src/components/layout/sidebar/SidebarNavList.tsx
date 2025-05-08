
import React from 'react';
import { SidebarNavItem } from './SidebarNavItem';

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
};

type NavCategory = {
  name: string;
  items: NavItem[];
};

interface SidebarNavListProps {
  navItems: NavCategory[];
  expandedItems: string[];
  onToggleExpand: (label: string) => void;
  textColor: string;
  textHoverColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
}

export const SidebarNavList = ({
  navItems,
  expandedItems,
  onToggleExpand,
  textColor,
  textHoverColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor
}: SidebarNavListProps) => {
  return (
    <ul className="space-y-1">
      {navItems.map((category) => (
        <li key={category.name || 'default-category'}>
          {category.name && (
            <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
              {category.name}
            </div>
          )}
          <ul className="space-y-1 mb-2">
            {(category.items || []).map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                isExpanded={expandedItems.includes(item.label)}
                onToggleExpand={onToggleExpand}
                textColor={textColor}
                textHoverColor={textHoverColor}
                activeBgColor={activeBgColor}
                activeTextColor={activeTextColor}
                hoverBgColor={hoverBgColor}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
