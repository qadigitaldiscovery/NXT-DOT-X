
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SharedNavbar } from './SharedNavbar';
import { SharedSidebar } from './SharedSidebar';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem, NavCategory } from './sidebar/types';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

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
  removeBottomToggle = false, // Changed default to false to show bottom toggle
  showTopLeftToggle = true // Default to true to show top left toggle
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Default navigation footer if none is provided
  const defaultNavigationFooter = (
    <div className="flex items-center justify-between p-2 border-t border-slate-700/50 mt-auto">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

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
            customFooterContent={customFooterContent || defaultNavigationFooter}
            className={sidebarClassName}
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
