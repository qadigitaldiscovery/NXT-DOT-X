
import React from 'react';
import { cn } from '@/lib/utils';
import { NavItem } from './types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  iconColor?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  textColor = "text-gray-300",
  textHoverColor = "hover:text-white",
  activeBgColor = "bg-gray-800",
  activeTextColor = "text-white",
  iconColor = "text-gray-400"
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  // For icons
  const Icon = item.icon;
  
  // Handle path/href
  const path = item.path || item.href || "#";
  
  // If item has children, toggle submenu on click
  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  return (
    <div className="relative">
      <Link
        to={path}
        onClick={handleClick}
        className={cn(
          "flex items-center py-2 px-3 rounded-md text-sm",
          isActive ? cn(activeBgColor, activeTextColor) : textColor,
          textHoverColor,
          "transition-colors"
        )}
      >
        {Icon && (
          <span className={cn("mr-2", isActive ? activeTextColor : iconColor)}>
            <Icon className="h-4 w-4" />
          </span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
        {hasChildren && (
          <ChevronRight 
            className={cn(
              "h-4 w-4 transition-transform", 
              isSubMenuOpen ? "rotate-90" : ""
            )} 
          />
        )}
      </Link>
      
      {/* Submenu */}
      {hasChildren && isSubMenuOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children?.map((child, idx) => (
            <SidebarItem
              key={idx}
              item={child}
              isActive={false} // You might want to implement logic for checking if submenu item is active
              textColor={textColor}
              textHoverColor={textHoverColor}
              activeBgColor={activeBgColor}
              activeTextColor={activeTextColor}
              iconColor={iconColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};
