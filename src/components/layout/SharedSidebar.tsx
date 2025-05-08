
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MenuIcon, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarNavList } from './sidebar/SidebarNavList';
import { CollapsedSidebar } from './sidebar/CollapsedSidebar';
import { NavLink } from 'react-router-dom';

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
  const textColor = 'text-gray-300';
  const textHoverColor = 'hover:text-white';
  const activeBgColor = 'bg-blue-600';
  const activeTextColor = 'text-white';
  const headerTextColor = 'text-white';
  const hoverBgColor = 'hover:bg-slate-700';

  // Add Home button to master dashboard
  const homeItem = { label: "Back to Home", icon: Home, path: "/" };

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
          open ? "w-60" : "w-0 md:w-20",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "flex items-center justify-between p-4 h-16",
        )}>
          {/* Render Title only when open */}
          {open && (
            <h1 className={cn("text-xl font-bold whitespace-nowrap", headerTextColor)}>
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
              <ChevronLeft className="h-5 w-5" />
            ) : ( 
              open ? <ChevronLeft className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" /> 
            )}
          </Button>
        </div>

        {/* Home button for Master Dashboard */}
        {open && (
          <div className="px-3 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm',
                  isActive
                    ? `${activeBgColor} ${activeTextColor}`
                    : `${textColor} ${textHoverColor} ${hoverBgColor}`
                )
              }
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </NavLink>
          </div>
        )}

        {/* Full Navigation List (Visible when open) */}
        <nav className={cn(
          "flex-1 py-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700",
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
          <div className="mt-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "w-12 h-12 flex items-center justify-center rounded-md transition-colors mx-auto",
                  isActive 
                    ? `${activeBgColor} ${activeTextColor}` 
                    : `${textColor} ${hoverBgColor}`
                )
              }
              title="Back to Home"
            >
              <Home className="h-5 w-5" />
            </NavLink>
          </div>
        )}

        {!open && (
          <CollapsedSidebar 
            navItems={navItems}
            textColor={textColor}
            activeBgColor={activeBgColor}
            activeTextColor={activeTextColor}
            hoverBgColor={hoverBgColor}
          />
        )}

        {/* Footer can be empty or used later */}
        <div className="mt-auto h-10"></div> {/* Empty footer placeholder */}
      </aside>
    </>
  );
};
