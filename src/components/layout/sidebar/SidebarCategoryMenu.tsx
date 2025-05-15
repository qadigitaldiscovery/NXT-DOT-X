
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { NavItem } from './types';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarCategoryMenuProps {
  title: string;
  items: NavItem[];
  open?: boolean;
  collapsed?: boolean;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
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
}) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const location = useLocation();
  
  // Check if any item in this category is active
  const hasActiveItem = React.useMemo(() => {
    return items.some(item => {
      const currentPath = location.pathname;
      const itemPath = item.href || item.path;
      return currentPath === itemPath || 
             (item.activeMatchPattern && 
              (typeof item.activeMatchPattern === 'string' 
                ? currentPath.includes(item.activeMatchPattern) 
                : item.activeMatchPattern.test(currentPath)));
    });
  }, [items, location.pathname]);

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
          {title}
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
          {items.map((item, index) => {
            // Check if current route matches this item
            const isActive = location.pathname === (item.href || item.path) || 
                           (item.activeMatchPattern && 
                            (typeof item.activeMatchPattern === 'string' 
                             ? location.pathname.includes(item.activeMatchPattern) 
                             : item.activeMatchPattern.test(location.pathname)));

            return (
              <SidebarItem
                key={index}
                item={item}
                isActive={isActive}
                textColor={textColor}
                textHoverColor={textHoverColor}
                activeBgColor={activeBgColor}
                activeTextColor={activeTextColor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
