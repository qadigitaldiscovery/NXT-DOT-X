import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from './types';
import { cn } from '../../../lib/utils';
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

  // Route path, using href with path as fallback for backwards compatibility
  const to = item.href || item.path || '#';

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };

  // Content to render inside the item
  const itemContent = (
    <>
      {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-500" />}
      <span className="flex-1 text-sm font-medium">{item.label}</span>
      {hasChildren && (
        <span className="ml-auto">
          {isExpanded ? 
            <ChevronDown className="h-4 w-4 text-gray-400" /> : 
            <ChevronRight className="h-4 w-4 text-gray-400" />
          }
        </span>
      )}
    </>
  );

  return (
    <div className="mb-1">
      {/* If has children or no valid path, use a div */}
      {hasChildren || to === '#' ? (
        <div
          className={cn(
            "flex items-center rounded-md px-3 py-2 cursor-pointer select-none",
            isActive ? cn(activeBgColor, activeTextColor) : cn(textColor, textHoverColor, hoverBgColor),
          )}
          onClick={handleClick}
        >
          {itemContent}
        </div>
      ) : (
        /* Otherwise use NavLink for navigation */
        <NavLink
          to={to}
          className={({ isActive: routeActive }) => cn(
            "flex items-center rounded-md px-3 py-2 cursor-pointer select-none",
            (isActive || routeActive) ? cn(activeBgColor, activeTextColor) : cn(textColor, textHoverColor, hoverBgColor),
          )}
          onClick={(e) => {
            if (onClick) onClick();
          }}
        >
          {itemContent}
        </NavLink>
      )}

      {/* Render children if expanded */}
      {hasChildren && isExpanded && item.children && (
        <div className="pl-8 mt-1 space-y-1 border-l border-gray-200">
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
