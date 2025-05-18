
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { NavItem, NavCategory } from './types';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarCategoryMenuProps {
  title?: string;
  items?: NavItem[];
  open?: boolean;
  collapsed?: boolean;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
  category?: NavCategory; // Add category prop
  currentPath?: string;
  userRole?: string;
}

export const SidebarCategoryMenu: React.FC<SidebarCategoryMenuProps> = ({
  title,
  items,
  open = true,
  collapsed = false,
  textColor = "text-white",
  textHoverColor = "hover:text-white",
  activeBgColor = "bg-indigo-500",
  activeTextColor = "text-white",
  hoverBgColor = "hover:bg-indigo-900/50",
  category, // New category prop
  currentPath
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(!!open);
  const location = useLocation();
  
  // Use category props if provided
  const menuTitle = category?.label || title;
  const menuItems = category?.items || items || [];
  
  // Use provided currentPath or get from location
  const path = currentPath || location.pathname;

  if (collapsed) {
    return null; // Don't render category titles in collapsed mode
  }

  return (
    <div className="mb-2">
      {!collapsed && (
        <Button
          variant="ghost"
          className={cn(
            "flex justify-between items-center w-full px-2 py-1 font-medium",
            textColor,
            textHoverColor,
            "text-xs opacity-60 hover:opacity-80 transition-colors"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {menuTitle}
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      )}
      
      {isOpen && (
        <div className="mt-1 ml-1 space-y-0.5">
          {menuItems.map((item, index) => {
            // Ensure isActive is always a boolean with explicit type
            const isActive: boolean = !!(path === (item.href || item.path) || 
                           (item.activeMatchPattern && 
                            (typeof item.activeMatchPattern === 'string' 
                             ? path.includes(item.activeMatchPattern) 
                             : item.activeMatchPattern.test(path))));

            return (
              <SidebarItem
                key={index}
                item={item}
                isActive={isActive}
                textColor={textColor}
                textHoverColor={textHoverColor}
                activeBgColor={activeBgColor}
                activeTextColor={activeTextColor}
                hoverBgColor={hoverBgColor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
