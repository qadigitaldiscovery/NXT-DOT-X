import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarNavList } from './sidebar/SidebarNavList';
import { CollapsedSidebar } from './sidebar/CollapsedSidebar';
import { NavItem, NavCategory, SidebarProps } from './sidebar/types';
import { useAuth } from '@/context/AuthContext';
import { SidebarToggleButton } from './sidebar/SidebarToggleButton';

// Helper function to normalize navigation items
const normalizeNavItems = (items: NavItem[] = []): NavItem[] => {
  return items.map(item => ({
    ...item,
    href: item.href || item.path || '#' // Ensure href is always present
  }));
};

const normalizeNavCategories = (categories: NavCategory[] = []): NavCategory[] => {
  return categories.map(category => ({
    ...category,
    items: category.items.map(item => ({
      ...item,
      href: item.href || item.path || '#' // Ensure href is always present
    }))
  }));
};

export const SidebarMain: React.FC<SidebarProps> = ({
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

  // Use provided open/onToggle or internal state
  const [internalOpen, setInternalOpen] = useState(() => {
    // Initialize with initialState if provided
    if (initialState) {
      return initialState === 'expanded';
    }
    return true;
  });
  
  const isOpen = open !== undefined ? open : internalOpen;
  
  const toggleSidebar = () => {
    // Call the provided onToggle without arguments
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
    
    // Call onStateChange with the new state if provided
    if (onStateChange) {
      onStateChange(isOpen ? 'collapsed' : 'expanded');
    }
  };

  // Combined navigation items
  const allCategories = [...normalizeNavCategories(navCategories), ...normalizeNavCategories(items)];
  const allNavItems = [...normalizeNavItems(navItems)];

  // If there are plain navItems without categories
  if (allNavItems.length > 0 && allCategories.length === 0) {
    allCategories.push({
      label: "Navigation",
      name: "Navigation",
      items: allNavItems
    });
  }

  // Log navigation data for debugging
  console.log('SidebarMain - User:', user?.username, 'Role:', user?.role);
  console.log('SidebarMain - Navigation Categories:', allCategories);
  console.log('SidebarMain - Plain Nav Items:', allNavItems);

  // Updated styling with more reasonable sizing
  const sidebarBgColor = className || 'bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950';
  const textColor = 'text-blue-200';
  const textHoverColor = 'hover:text-blue-300';
  const activeBgColor = 'bg-gradient-to-r from-blue-800 to-indigo-700';
  const activeTextColor = 'text-white';
  const hoverBgColor = 'hover:bg-indigo-900/50';
  
  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
  };
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-20 backdrop-blur-sm" 
          onClick={toggleSidebar} 
        />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-xl flex flex-col transition-all duration-300 ease-in-out",
          sidebarBgColor,
          isOpen ? "w-60" : "w-0 md:w-16",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0"
        )}
      >
        {/* Full Navigation List (Visible when open) */}
        <nav className={cn(
          "flex-1 pt-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800/50 scrollbar-track-slate-900/50",
          !isOpen && "hidden" // Hide when sidebar is collapsed
        )}>
          <SidebarNavList 
            categories={allCategories}
            userRole={user?.role}
            expandedCategories={expandedItems}
            onCategoryToggle={toggleExpanded}
            textColor={textColor}
            textHoverColor={textHoverColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
          />
        </nav>

        {/* Icon-Only Navigation (Visible when collapsed on desktop) */}
        {!isOpen && !isMobile && (
          <CollapsedSidebar 
            navItems={allCategories.flatMap(cat => cat.items)}
            textColor={textColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
            homeItem={homeItem}
          />
        )}

        {/* Navigation buttons at bottom */}
        <div className="flex justify-center space-x-2 bg-indigo-950/80 border-t border-indigo-900/50 py-3">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700">
            1
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700">
            2
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700">
            3
          </Button>
        </div>
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