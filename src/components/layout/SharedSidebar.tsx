
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarNavList } from './sidebar/SidebarNavList';
import { CollapsedSidebar } from './sidebar/CollapsedSidebar';

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
};

type NavCategory = {
  name: string;
  items: NavItem[];
};

interface SharedSidebarProps {
  open: boolean;
  onToggle: () => void;
  navItems: NavCategory[];
}

export const SharedSidebar = ({ open, onToggle, navItems }: SharedSidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  
  // Style constants
  const sidebarBgColor = 'bg-slate-800';
  const textColor = 'text-gray-200';
  const textHoverColor = 'hover:text-white';
  const activeBgColor = 'bg-blue-600';
  const activeTextColor = 'text-white';
  const headerTextColor = 'text-white';
  const hoverBgColor = 'hover:bg-slate-700';

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-lg flex flex-col transition-all duration-300 ease-in-out",
          sidebarBgColor,
          open ? "w-72" : "w-0 md:w-24",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "flex items-center justify-between p-5 h-20",
        )}>
          {/* Render Title only when open */}
          {open && (
            <h1 className={cn("text-2xl font-bold whitespace-nowrap", headerTextColor)}>
              NXT DOT-X
            </h1>
          )}
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(headerTextColor, textHoverColor, open ? "ml-2" : "mx-auto")}
          >
            {isMobile ? (
              <ChevronLeft className="h-6 w-6" />
            ) : ( 
              open ? <ChevronLeft className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" /> 
            )}
          </Button>
        </div>

        {/* Full Navigation List (Visible when open) */}
        <nav className={cn(
          "flex-1 py-4 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700",
          !open && "hidden" // Hide when sidebar is collapsed
        )}>
          <SidebarNavList 
            navItems={navItems}
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
        {!open && (
          <CollapsedSidebar 
            navItems={navItems}
            textColor={textColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
          />
        )}

        {/* Footer area - removed home button */}
        <div className="mt-auto p-4 border-t border-gray-700">
          {/* Content can be added here if needed */}
        </div>
      </aside>
    </>
  );
};
