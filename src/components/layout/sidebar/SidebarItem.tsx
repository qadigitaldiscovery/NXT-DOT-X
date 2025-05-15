
import React from 'react';
import { NavItem } from './types';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  textColor: string;
  textHoverColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
  onClick?: () => void;
}

export function SidebarItem({
  item,
  isActive,
  textColor,
  textHoverColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor,
  onClick
}: SidebarItemProps) {
  const Icon = item.icon;
  const hasChildren = !!(item.children && item.children.length > 0);

  return (
    <div className="mb-1">
      <div
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm cursor-pointer",
          isActive ? cn(activeBgColor, activeTextColor) : cn(textColor, textHoverColor, hoverBgColor),
        )}
        onClick={onClick}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{item.label}</span>
        {hasChildren && (
          <span className="ml-auto">
            ▼
          </span>
        )}
      </div>
    </div>
  );
}
