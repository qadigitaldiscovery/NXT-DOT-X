import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarNavList } from './sidebar/SidebarNavList';
import { CollapsedSidebar } from './sidebar/CollapsedSidebar';
import { NavItem, NavCategory } from './sidebar/types';
import { NavLink } from 'react-router-dom';

interface SharedSidebarProps {
  open: boolean;
  onToggle: () => void;
  navItems: NavCategory[];
  homeItem?: NavItem;
}

export const SharedSidebar = ({
  open,
  onToggle,
  navItems,
  homeItem
}: SharedSidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Updated styling with more reasonable sizing
  const sidebarBgColor = 'bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950';
  const textColor = 'text-blue-200';
  const textHoverColor = 'hover:text-blue-300';
  const activeBgColor = 'bg-gradient-to-r from-blue-800 to-indigo-700';
  const activeTextColor = 'text-white';
  const hoverBgColor = 'hover:bg-indigo-900/50';
  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
  };
  return <>
      {/* Mobile backdrop */}
      {open && isMobile && <div className="fixed inset-0 bg-black bg-opacity-70 z-20 backdrop-blur-sm" onClick={onToggle} />}

      <aside className={cn("fixed md:sticky top-0 left-0 h-screen z-30 shadow-xl flex flex-col transition-all duration-300 ease-in-out", sidebarBgColor, open ? "w-60" : "w-0 md:w-16", isMobile && !open && "-translate-x-full", isMobile && open && "translate-x-0")}>
        {/* Sidebar Header - Centered Logo */}
        <div className="">
          {/* Only show DOT-X logo when sidebar is open */}
          {open && <div className="flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-200">DOT-X</span>
              </div>
              <span className="text-xs text-blue-300 font-medium">NAVIGATION PANEL</span>
            </div>}
          
          {/* Toggle Button */}
          <Button variant="ghost" size="icon" onClick={onToggle} className={cn("bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 hover:text-blue-200 rounded-lg absolute right-2", !open && "mx-auto")}>
            {isMobile ? <ChevronLeft className="h-5 w-5" /> : open ? <ChevronLeft className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Full Navigation List (Visible when open) */}
        <nav className={cn("flex-1 py-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800/50 scrollbar-track-slate-900/50", !open && "hidden" // Hide when sidebar is collapsed
      )}>
          <SidebarNavList navItems={navItems} expandedItems={expandedItems} onToggleExpand={toggleExpanded} textColor={textColor} textHoverColor={textHoverColor} activeBgColor={activeBgColor} activeTextColor={activeTextColor} hoverBgColor={hoverBgColor} />
        </nav>

        {/* Icon-Only Navigation (Visible when collapsed on desktop) */}
        {!open && <CollapsedSidebar navItems={navItems} textColor={textColor} activeBgColor={activeBgColor} activeTextColor={activeTextColor} hoverBgColor={hoverBgColor} homeItem={homeItem} />}

        {/* Footer area with Home button */}
        <div className="p-2 border-t border-blue-900/50">
          {/* Home button when sidebar is open */}
          {open && homeItem && <NavLink to={homeItem.path} className={({
          isActive
        }) => cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mx-auto my-1", isActive ? `${activeBgColor} ${activeTextColor} shadow-md shadow-indigo-900/50` : `${textColor} ${textHoverColor} ${hoverBgColor}`)}>
              <homeItem.icon className="h-5 w-5" />
              <span className="font-medium uppercase">{homeItem.label}</span>
            </NavLink>}
          <div className="text-xs text-blue-400 font-mono text-center mt-2">v2.5.8</div>
        </div>
      </aside>
    </>;
};
