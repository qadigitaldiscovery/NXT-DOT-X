
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavCategory, NavItem } from '../types';
import { navCategories as globalNavCategories } from '../NavigationConfig';

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
  } else if (items && items.length > 0) {
    effectiveNavCategories = items;
  } else if (navCategories && navCategories.length > 0) {
    effectiveNavCategories = navCategories;
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
      console.log("NavItem clicked - navigating to:", item.href || item.path);
    }
    // Handle custom onClick if provided
    if ('onClick' in item && typeof item.onClick === 'function') {
      item.onClick();
    }
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  // Auto-expand categories based on active path
  useEffect(() => {
    effectiveNavCategories.forEach(category => {
      const hasActiveItem = category.items?.some(isItemActive);
      if (hasActiveItem) {
        const categoryName = category.name || category.label || '';
        if (categoryName && !expandedCategories.includes(categoryName)) {
          setExpandedCategories(prev => [...prev, categoryName]);
        }
      }
    });
  }, [location.pathname, effectiveNavCategories]);

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border bg-gray-900 text-white px-4">
        <span className="font-semibold">Navigation</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-white hover:bg-gray-800 md:hidden"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-900 text-white">
        {/* Home item if provided */}
        {homeItem && (
          <div className="px-3 pt-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 mb-2",
                isItemActive(homeItem) && "bg-gray-800 text-white"
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
                  className="w-full justify-between items-center text-gray-400 hover:text-white hover:bg-gray-800/30 py-2"
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
                {isExpanded && category.items && (
                  <div className="mt-1 ml-2 space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <Button
                        key={`${item.label}-${itemIndex}`}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 py-1.5 h-auto",
                          isItemActive(item) && "bg-gray-800/50 text-white"
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
