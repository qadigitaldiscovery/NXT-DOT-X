
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
  }
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
      <div className="flex h-full">
        {/* Sidebar */}
        <SharedSidebar 
          open={sidebarOpen} 
          onToggle={toggleSidebar} 
          navItems={navCategories}
          homeItem={homeItem}
        />
        
        {/* Main Content */}
        <div className={cn(
          "flex-1 flex flex-col overflow-auto transition-all duration-200",
          !sidebarOpen && "md:ml-16"
        )}>
          {/* Header */}
          <SharedNavbar 
            onMenuClick={toggleSidebar} 
            moduleTitle={moduleTitle}
            notificationArea={notificationArea}
          />

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-6">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SharedDashboardLayout;
