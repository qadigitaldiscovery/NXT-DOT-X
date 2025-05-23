
import React, { useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { SidebarNavList } from './sidebar/SidebarNavList';
import { CompactSidebar } from './sidebar/CompactSidebar';
import { NavCategory } from './sidebar/types';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/user-menu';
import { useAuth } from '@/context/AuthContext';

interface SharedDashboardLayoutProps {
  children: React.ReactNode;
  moduleTitle: string;
  navCategories: NavCategory[];
  customFooterContent?: React.ReactNode;
  showTopLeftToggle?: boolean;
  removeBottomToggle?: boolean;
  initialSidebarState?: string;
  onSidebarStateChange?: (state: string) => void;
  sidebarClassName?: string;
}

const SharedDashboardLayout: React.FC<SharedDashboardLayoutProps> = ({
  children,
  moduleTitle,
  navCategories,
  customFooterContent,
  showTopLeftToggle = true,
  removeBottomToggle = false,
  initialSidebarState = "expanded",
  onSidebarStateChange,
  sidebarClassName = "bg-indigo-950"
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(initialSidebarState !== "collapsed");
  const { user } = useAuth();
  
  const currentRole = user?.role || 'user'; // Default to 'user' if no role found
  
  const handleToggleSidebar = () => {
    const newState = !sidebarExpanded;
    setSidebarExpanded(newState);
    
    // Persist sidebar state via callback
    if (onSidebarStateChange) {
      onSidebarStateChange(newState ? "expanded" : "collapsed");
    }
  };
  
  const handleToggleExpand = (label: string) => {
    if (expandedItems.includes(label)) {
      setExpandedItems(expandedItems.filter(item => item !== label));
    } else {
      setExpandedItems([...expandedItems, label]);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className={`${sidebarClassName} transition-all duration-300 flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} border-r border-gray-800`}>
        {/* Logo/Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {sidebarExpanded && <h1 className="text-lg font-semibold">NXT Platform</h1>}
          {showTopLeftToggle && (
            <button 
              onClick={handleToggleSidebar}
              className="p-1 rounded-md hover:bg-indigo-900 text-gray-300 hover:text-white"
            >
              {sidebarExpanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          {sidebarExpanded ? (
            <SidebarNavList 
              categories={navCategories}
              userRole={currentRole as 'admin' | 'manager' | 'user'} 
              expandedCategories={expandedItems}
              onCategoryToggle={handleToggleExpand}
              textColor="text-gray-300"
              textHoverColor="hover:text-white"
              activeBgColor="bg-indigo-500"
              activeTextColor="text-white"
              hoverBgColor="hover:bg-indigo-900/50"
            />
          ) : (
            <CompactSidebar 
              navItems={navCategories.flatMap(cat => cat.items)}
              textColor="text-gray-300"
              activeBgColor="bg-indigo-500"
              activeTextColor="text-white"
              hoverBgColor="hover:bg-indigo-900/50"
            />
          )}
        </div>
        
        {/* Footer content if provided */}
        {customFooterContent && sidebarExpanded && (
          <div>{customFooterContent}</div>
        )}
        
        {/* Bottom toggle button */}
        {!removeBottomToggle && (
          <div className="p-2 border-t border-gray-800">
            <button
              onClick={handleToggleSidebar}
              className="w-full flex justify-center p-1 rounded-md hover:bg-indigo-900 text-gray-300 hover:text-white"
            >
              {sidebarExpanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
            </button>
          </div>
        )}
      </aside>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-zinc-800 border-b border-zinc-700 p-4 flex items-center justify-between">
          <h1 className="text-xl font-medium">{moduleTitle}</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SharedDashboardLayout;
