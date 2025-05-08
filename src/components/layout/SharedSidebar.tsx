
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
  
  // Style constants - updated for a more stylish look
  const sidebarBgColor = 'bg-gradient-to-b from-slate-800 to-slate-900';
  const textColor = 'text-gray-200';
  const textHoverColor = 'hover:text-blue-300';
  const activeBgColor = 'bg-gradient-to-r from-blue-600 to-indigo-700';
  const activeTextColor = 'text-white';
  const headerTextColor = 'text-white';
  const hoverBgColor = 'hover:bg-slate-700/50';

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
          className="fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-xl flex flex-col transition-all duration-300 ease-in-out",
          sidebarBgColor,
          open ? "w-72" : "w-0 md:w-24",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "flex items-center justify-between p-6 h-24 border-b border-blue-900/40",
        )}>
          {/* Render Title only when open */}
          {open && (
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                DOT-X
              </span>
              <span className="text-xs text-blue-400 font-semibold">NAVIGATION</span>
            </div>
          )}
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "bg-blue-900/20 hover:bg-blue-800/30 text-blue-300 hover:text-blue-200 rounded-lg",
              open ? "ml-2" : "mx-auto"
            )}
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
          "flex-1 py-6 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-slate-800",
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

        {/* Footer area */}
        <div className="p-4 border-t border-blue-900/40 flex items-center justify-center">
          <div className="text-sm text-blue-400 font-mono">v2.5.8</div>
        </div>
      </aside>
    </>
  );
};
