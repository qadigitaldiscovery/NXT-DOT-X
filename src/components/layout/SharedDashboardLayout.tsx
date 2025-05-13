
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SharedNavbar } from './SharedNavbar';
import { SharedSidebar } from './SharedSidebar';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem, NavCategory } from './sidebar/types';

interface SharedDashboardLayoutProps {
  moduleTitle?: string;
  navCategories: NavCategory[];
  children?: React.ReactNode;
  notificationArea?: React.ReactNode;
  homeItem?: NavItem;
  customFooterContent?: React.ReactNode;
  sidebarClassName?: string;
  removeBottomToggle?: boolean;
  showTopLeftToggle?: boolean;
}

const SharedDashboardLayout: React.FC<SharedDashboardLayoutProps> = ({
  moduleTitle = "Dashboard",
  navCategories,
  children,
  notificationArea,
  homeItem = {
    path: '/',
    label: 'Master Dashboard',
    icon: Home
  },
  customFooterContent,
  sidebarClassName,
  removeBottomToggle = false,
  showTopLeftToggle = true
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-gray-900">
      {/* Main Layout */}
      <div className="flex h-full flex-col">
        {/* Header - Now positioned above the sidebar and main content */}
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle={moduleTitle}
          notificationArea={notificationArea}
          showSidebarToggle={showTopLeftToggle}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <SharedSidebar 
            open={sidebarOpen} 
            onToggle={toggleSidebar} 
            navItems={navCategories}
            homeItem={homeItem}
            customFooterContent={customFooterContent}
            className={sidebarClassName || "bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"}
            removeBottomToggle={removeBottomToggle}
          />
          
          {/* Main Content */}
          <div className={cn(
            "flex-1 overflow-auto transition-all duration-200"
          )}>
            {/* Dashboard Content */}
            <main className="p-6 overflow-auto h-full">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedDashboardLayout;
