
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarNavList } from './SidebarNavList';
import { CollapsedSidebar } from './CollapsedSidebar';
import { NavItem, NavCategory, SidebarProps } from './types';
import { useAuth } from '@/context/AuthContext';
import { SidebarToggleButton } from './SidebarToggleButton';

export const Sidebar = ({
  open,
  onToggle,
  navItems = [],
  homeItem,
  customFooterContent,
  className,
  removeBottomToggle = false
}: SidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user } = useAuth();

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
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-20 backdrop-blur-sm" 
          onClick={onToggle} 
        />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-xl flex flex-col transition-all duration-300 ease-in-out",
          sidebarBgColor,
          open ? "w-60" : "w-0 md:w-16",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        {/* Full Navigation List (Visible when open) */}
        <nav className={cn(
          "flex-1 pt-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800/50 scrollbar-track-slate-900/50",
          !open && "hidden" // Hide when sidebar is collapsed
        )}>
          <SidebarNavList 
            navItems={navItems}
            items={navItems.flatMap(category => category.items)}
            userRole={user?.role}
            expandedItems={expandedItems}
            onToggleExpand={toggleExpanded}
            textColor={textColor}
            textHoverColor={textHoverColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
          />
        </nav>

        {/* Icon-Only Navigation (Visible when collapsed on desktop) */}
        {!open && !isMobile && (
          <CollapsedSidebar 
            navItems={navItems}
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
      {!removeBottomToggle && <SidebarToggleButton open={open} onToggle={onToggle} />}
    </>
  );
};
