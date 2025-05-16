import React, { useState } from 'react';
import { NavItem } from './types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="mb-1">
      <div
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm cursor-pointer",
          isActive ? cn(activeBgColor, activeTextColor) : cn(textColor, textHoverColor, hoverBgColor),
        )}
        onClick={handleClick}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{item.label}</span>
        {hasChildren && (
          <span className="ml-auto">
            {isExpanded ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </span>
        )}
      </div>

      {/* Render children if expanded */}
      {hasChildren && isExpanded && item.children && (
        <div className="pl-6 mt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarItem
              key={child.label}
              item={child}
              isActive={false}
              textColor={textColor}
              textHoverColor={textHoverColor}
              activeBgColor={activeBgColor}
              activeTextColor={activeTextColor}
              hoverBgColor={hoverBgColor}
              onClick={() => onClick && onClick()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
