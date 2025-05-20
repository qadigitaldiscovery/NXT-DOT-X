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
  sidebarClassName = "bg-gray-900"
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(initialSidebarState !== "collapsed");
  const {
    user
  } = useAuth();
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
  return <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className={`${sidebarClassName} transition-all duration-300 flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} border-r border-gray-800`}>
        {/* Logo/Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800 rounded-sm bg-gray-900">
          {sidebarExpanded && <h1 className="text-lg font-semibold">NXT Platform</h1>}
          {showTopLeftToggle && <button onClick={handleToggleSidebar} className="p-1 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white">
              {sidebarExpanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
            </button>}
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2 bg-gray-900">
          {sidebarExpanded ? <SidebarNavList categories={navCategories} userRole={currentRole as 'admin' | 'manager' | 'user'} expandedCategories={expandedItems} onCategoryToggle={handleToggleExpand} textColor="text-gray-300" textHoverColor="hover:text-white" activeBgColor="bg-gray-700" activeTextColor="text-white" hoverBgColor="hover:bg-gray-800/50" /> : <CompactSidebar navItems={navCategories.flatMap(cat => cat.items)} />}
        </div>
        
        {/* Footer content if provided */}
        {customFooterContent && sidebarExpanded && <div>{customFooterContent}</div>}
        
        {/* Bottom toggle button */}
        {!removeBottomToggle && <div className="p-2 border-t border-gray-800 bg-gray-900">
            <button onClick={handleToggleSidebar} className="w-full flex justify-center p-1 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white">
              {sidebarExpanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
            </button>
          </div>}
      </aside>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="border-b border-gray-800 p-4 flex items-center justify-between py-[9px] bg-slate-200">
          <h1 className="text-gray-700 text-2xl font-extrabold">{moduleTitle}</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50">
          {children}
        </main>
      </div>
    </div>;
};
export default SharedDashboardLayout;