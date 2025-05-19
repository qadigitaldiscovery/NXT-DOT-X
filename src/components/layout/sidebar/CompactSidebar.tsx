import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Home, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavCategory, NavItem } from "./types";
import { SidebarNavigation } from './SidebarNavigation';
import { useLocation } from 'react-router-dom';
import { navCategories as globalNavCategories } from './NavigationConfig';

interface CompactSidebarProps {
  open?: boolean;
  onToggle?: () => void;
  navItems?: any[];
  navCategories?: NavCategory[];
  items?: any[];
  homeItem?: any;
  className?: string;
  removeBottomToggle?: boolean;
  showToggleButton?: boolean;
  initialState?: 'expanded' | 'collapsed';
  onStateChange?: (state: 'expanded' | 'collapsed') => void;
}

export const CompactSidebar: React.FC<CompactSidebarProps> = ({
  open,
  onToggle,
  navItems,
  navCategories,
  items,
  homeItem,
  className,
  removeBottomToggle,
  showToggleButton,
  initialState,
  onStateChange,
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(initialState === 'expanded');
  const location = useLocation();

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  React.useEffect(() => {
    setIsExpanded(initialState === 'expanded');
  }, [initialState]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    onToggle?.();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    onStateChange?.(!isExpanded ? 'expanded' : 'collapsed');
  };

  // Determine which navigation to use
  let effectiveNavCategories: NavCategory[] = [];
  
  // Check if we're in a data management route
  const isDataManagement = location.pathname.startsWith('/data-management');
  const dataManagementCategory = globalNavCategories.find(category => category.label === "Data Management");
  
  if (isDataManagement && dataManagementCategory) {
    // For data management routes, always use data management category
    effectiveNavCategories = [dataManagementCategory];
    console.log('MainSidebarContent - Using Data Management Navigation');
  } else if (navCategories && navCategories.length > 0) {
    // Use provided navCategories
    effectiveNavCategories = navCategories;
    console.log('MainSidebarContent - Using Provided Nav Categories');
  } else if (items && items.length > 0) {
    // Use provided items (legacy support)
    effectiveNavCategories = items;
    console.log('MainSidebarContent - Using Legacy Items');
  } else if (navItems && navItems.length > 0) {
    // Create a category from navItems
    effectiveNavCategories = [{
      name: 'Navigation',
      label: 'Navigation',
      items: navItems
    }];
    console.log('MainSidebarContent - Using Nav Items');
  } else {
    effectiveNavCategories = globalNavCategories;
    console.log('MainSidebarContent - Using Global Navigation');
  }

  return (
    <aside
      className={cn(
        "bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-10 md:relative",
        sidebarOpen ? "w-64" : "w-0 md:w-16",
        className
      )}
    >
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          {sidebarOpen && (
            <span className="text-xl font-semibold">Healthcare</span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="md:block hidden text-gray-400 hover:text-white"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar content */}
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {homeItem && (
              <li>
                <a
                  href={homeItem.path}
                  className="flex items-center py-2 px-3 text-sm rounded hover:bg-gray-800"
                >
                  {<Home className="h-5 w-5 mr-3" />}
                  {sidebarOpen && <span>{homeItem.label}</span>}
                </a>
              </li>
            )}
            {effectiveNavCategories && (
              <SidebarNavigation 
                categories={effectiveNavCategories}
                userRole="admin"
              />
            )}
          </ul>
        </nav>
      </div>

      {showToggleButton !== false && (
        <div className="absolute bottom-0 left-0 w-full p-4">
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-center w-full py-2 px-3 text-sm rounded hover:bg-gray-800"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      )}
    </aside>
  );
};
