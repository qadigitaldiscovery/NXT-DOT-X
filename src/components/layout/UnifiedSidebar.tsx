
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X, Menu, ChevronDown, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavCategory, NavItem } from './sidebar/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { navCategories } from './sidebar/NavigationConfig';

export interface UnifiedSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  items?: NavCategory[];
  homeItem?: NavItem;
  moduleTitle?: string;
  useGlobalNavigation?: boolean;
}

export function UnifiedSidebar({
  isOpen = true,
  onToggle,
  items = [],
  homeItem,
  moduleTitle = 'Navigation',
  useGlobalNavigation = false
}: UnifiedSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // Determine which navigation to use
  const effectiveNavItems = useGlobalNavigation ? navCategories : items;
  
  // Helper to check if an item is active
  const isItemActive = (item: NavItem): boolean => {
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

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Handle item click
  const handleItemClick = (item: NavItem) => {
    if (item.href || item.path) {
      navigate(item.href || item.path || '/');
    }
    
    if ('onClick' in item && typeof item.onClick === 'function') {
      item.onClick();
    }
    
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  // Auto-expand categories with active items on route change
  useEffect(() => {
    effectiveNavItems.forEach(category => {
      const hasActiveItem = category.items?.some(isItemActive);
      if (hasActiveItem) {
        const categoryName = category.name || category.label || '';
        if (categoryName && !expandedCategories.includes(categoryName)) {
          setExpandedCategories(prev => [...prev, categoryName]);
        }
      }
    });
  }, [location.pathname, effectiveNavItems]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col transition-transform duration-300 ease-in-out bg-gray-900",
          "md:sticky md:border-r md:border-r-gray-800",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 text-white px-4">
          {isOpen && <span className="font-semibold truncate">{moduleTitle}</span>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 text-white hover:bg-gray-800"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Sidebar Content - Expanded View */}
        <div className={cn(
          "flex-1 overflow-auto bg-gray-900 text-white",
          !isOpen && "hidden md:hidden"
        )}>
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
            {effectiveNavItems.map((category, index) => {
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
        
        {/* Sidebar Content - Collapsed View (Icon Only) */}
        {!isOpen && !isMobile && (
          <div className="flex flex-col items-center py-4 overflow-y-auto">
            {/* Home item in collapsed view */}
            {homeItem && (
              <Button
                variant="ghost"
                className={cn(
                  "w-10 h-10 p-0 mb-4 text-gray-300 hover:text-white hover:bg-gray-800",
                  isItemActive(homeItem) && "bg-gray-800 text-white"
                )}
                onClick={() => handleItemClick(homeItem)}
                title={homeItem.label}
              >
                {homeItem.icon && <homeItem.icon className="h-5 w-5" />}
              </Button>
            )}
            
            {/* Show only icons for items in collapsed view */}
            {effectiveNavItems.flatMap(category => 
              category.items.map((item, index) => (
                <Button
                  key={`icon-${item.label}-${index}`}
                  variant="ghost"
                  className={cn(
                    "w-10 h-10 p-0 mb-1 text-gray-300 hover:text-white hover:bg-gray-800",
                    isItemActive(item) && "bg-gray-800 text-white"
                  )}
                  onClick={() => handleItemClick(item)}
                  title={item.label}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                </Button>
              ))
            )}
          </div>
        )}
      </aside>
    </>
  );
}
