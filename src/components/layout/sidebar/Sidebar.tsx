import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { ChevronLeft, MenuIcon } from 'lucide-react';
import { useIsMobile } from '../../../hooks/use-mobile';
import { SidebarNavList } from './SidebarNavList';
import { CollapsedSidebar } from './CollapsedSidebar';
import { NavItem, NavCategory, SidebarProps } from './types';
import { useAuth } from '../../../context/AuthContext';
import { SidebarToggleButton } from './SidebarToggleButton';

// Helper function to normalize navigation items
const normalizeNavItems = (items: NavItem[] = []): NavItem[] => {
  return items.map(item => ({
    ...item,
    href: item.href || item.path || '#'
  }));
};

const normalizeNavCategories = (categories: NavCategory[] = []): NavCategory[] => {
  return categories.map(category => ({
    ...category,
    items: category.items.map(item => ({
      ...item,
      href: item.href || item.path || '#'
    }))
  }));
};

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onToggle,
  navItems = [],
  navCategories = [],
  items = [],
  homeItem,
  customFooterContent,
  className,
  removeBottomToggle = false,
  showToggleButton = true,
  initialState,
  onStateChange
}) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user } = useAuth();

  const [internalOpen, setInternalOpen] = useState(() => {
    if (initialState) {
      return initialState === 'expanded';
    }
    return true;
  });
  
  const isOpen = open !== undefined ? open : internalOpen;
  
  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
    
    if (onStateChange) {
      onStateChange(isOpen ? 'collapsed' : 'expanded');
    }
  };

  // Combined navigation items
  const allCategories = [...normalizeNavCategories(navCategories), ...normalizeNavCategories(items)];
  const allNavItems = [...normalizeNavItems(navItems)];

  if (allNavItems.length > 0 && allCategories.length === 0) {
    allCategories.push({
      label: "Navigation",
      name: "Navigation",
      items: allNavItems
    });
  }

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
  };
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm" 
          onClick={toggleSidebar} 
        />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-lg flex flex-col transition-all duration-300 ease-in-out",
          "bg-white dark:bg-gray-900",
          "border-r border-gray-200 dark:border-gray-800",
          isOpen ? "w-64" : "w-0 md:w-16",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          {isOpen && (
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Data Management
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <ChevronLeft /> : <MenuIcon />}
          </button>
        </div>

        {/* Full Navigation List (Visible when open) */}
        <nav className={cn(
          "flex-1 pt-4 px-3 overflow-y-auto scrollbar-thin",
          "scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
          "scrollbar-track-gray-100 dark:scrollbar-track-gray-800",
          !isOpen && "hidden"
        )}>
          <SidebarNavList 
            categories={allCategories}
            userRole={user?.role}
            expandedCategories={expandedItems}
            onCategoryToggle={toggleExpanded}
            textColor="text-gray-700 dark:text-gray-300"
            textHoverColor="hover:text-gray-900 dark:hover:text-gray-100"
            activeBgColor="bg-gray-100 dark:bg-gray-800"
            activeTextColor="text-gray-900 dark:text-gray-100"
            hoverBgColor="hover:bg-gray-50 dark:hover:bg-gray-800/50"
          />
        </nav>

        {/* Icon-Only Navigation (Visible when collapsed on desktop) */}
        {!isOpen && !isMobile && (
          <CollapsedSidebar 
            navItems={allCategories}
            textColor="text-gray-700 dark:text-gray-300"
            activeBgColor="bg-gray-100 dark:bg-gray-800"
            activeTextColor="text-gray-900 dark:text-gray-100"
            hoverBgColor="hover:bg-gray-50 dark:hover:bg-gray-800/50"
            homeItem={homeItem}
          />
        )}

        {/* Footer */}
        {customFooterContent && (
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            {customFooterContent}
          </div>
        )}
      </aside>

      {/* Bottom sidebar toggle button (if not removed) */}
      {!removeBottomToggle && showToggleButton && (
        <SidebarToggleButton 
          open={isOpen} 
          onToggle={toggleSidebar} 
        />
      )}
    </>
  );
};

export { Sidebar };
export default Sidebar;
