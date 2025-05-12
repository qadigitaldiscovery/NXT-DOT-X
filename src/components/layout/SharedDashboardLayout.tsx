
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
  removeBottomToggle = false,
  showTopLeftToggle = true
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Default navigation footer - this will be used if no custom footer is provided
  const defaultNavigationFooter = (
    <div className="flex items-center justify-between w-full">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  // Always use a navigation footer, either custom or default
  const navigationFooter = customFooterContent || defaultNavigationFooter;

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
            customFooterContent={navigationFooter}
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
