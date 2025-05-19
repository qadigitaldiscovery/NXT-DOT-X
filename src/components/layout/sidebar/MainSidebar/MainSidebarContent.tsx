
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronDown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';
import { navCategories as globalNavCategories } from '@/components/layout/sidebar/NavigationConfig';

export interface MainSidebarContentProps {
  onClose?: () => void;
  navCategories?: NavCategory[];
  navItems?: NavItem[];
  items?: NavCategory[];
  homeItem?: NavItem;
  useGlobalNavigation?: boolean;
}

export function MainSidebarContent({ 
  onClose, 
  navCategories = [],
  navItems = [],
  items = [],
  homeItem,
  useGlobalNavigation = false
}: MainSidebarContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Determine which navigation to use
  let effectiveNavCategories: NavCategory[] = [];
  
  const isDataManagement = location.pathname.startsWith('/data-management');
  
  if (isDataManagement && useGlobalNavigation) {
    effectiveNavCategories = globalNavCategories;
  } else if (useGlobalNavigation) {
    effectiveNavCategories = globalNavCategories;
  } else if (navCategories && navCategories.length > 0) {
    effectiveNavCategories = navCategories;
  } else if (items && items.length > 0) {
    effectiveNavCategories = items;
  } else if (navItems && navItems.length > 0) {
    effectiveNavCategories = [{
      name: 'Navigation',
      label: 'Navigation',
      items: navItems
    }];
  }

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Check if item is active
  const isItemActive = (item: NavItem) => {
    const path = item.href || item.path || '';
    
    if (item.activeMatchPattern) {
      if (typeof item.activeMatchPattern === 'string') {
        return location.pathname.includes(item.activeMatchPattern);
      } else if (item.activeMatchPattern instanceof RegExp) {
        return item.activeMatchPattern.test(location.pathname);
      }
    }
    
    return location.pathname === path || 
      (path !== '/' && path !== '' && location.pathname.startsWith(path));
  };

  const handleItemClick = (item: NavItem) => {
    if (item.href || item.path) {
      navigate(item.href || item.path || '/');
    }
    if (item.onClick) {
      item.onClick();
    }
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border bg-redmetal-800 text-white px-4">
        <span className="font-semibold">Navigation</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-white hover:bg-redmetal-600 md:hidden"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-gradient-to-b from-redmetal-800 to-black text-white">
        {/* Home item if provided */}
        {homeItem && (
          <div className="px-3 pt-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-blue-100 hover:text-white hover:bg-blue-900/50 mb-2",
                isItemActive(homeItem) && "bg-blue-800/50 text-white"
              )}
              onClick={() => handleItemClick(homeItem)}
            >
              {homeItem.icon && <homeItem.icon className="mr-2 h-5 w-5" />}
              {homeItem.label}
            </Button>
          </div>
        )}
        
        {/* Categories */}
        <div className="px-3 py-2">
          {effectiveNavCategories.map((category, index) => {
            const isExpanded = expandedCategories.includes(category.name || category.label || `category-${index}`);
            const categoryName = category.name || category.label || `category-${index}`;
            
            return (
              <div key={`${categoryName}-${index}`} className="mb-3">
                {/* Category Header */}
                <Button
                  variant="ghost"
                  className="w-full justify-between items-center text-blue-200 hover:text-white hover:bg-blue-900/30 py-2"
                  onClick={() => toggleCategory(categoryName)}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {category.label || category.name}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                
                {/* Category Items */}
                {isExpanded && (
                  <div className="mt-1 ml-2 space-y-1">
                    {category.items?.map((item, itemIndex) => (
                      <Button
                        key={`${item.label}-${itemIndex}`}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-blue-100 hover:text-white hover:bg-blue-900/50 py-1.5 h-auto",
                          isItemActive(item) && "bg-blue-800/50 text-white"
                        )}
                        onClick={() => handleItemClick(item)}
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        <span className="text-sm">{item.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
