
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UnifiedSidebar } from './UnifiedSidebar';
import MasterDashNavbar from '../master-dash/MasterDashNavbar';
import MasterDashFooter from '../master-dash/MasterDashFooter';
import { useIsMobile } from '../../hooks/use-mobile';
import { Home } from 'lucide-react';
import { NavItem } from './sidebar/types';

const homeItem: NavItem = {
  label: 'Dashboard',
  href: '/dashboard',
  icon: Home
};

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Close sidebar on mobile by default
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Toggling sidebar:", !sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <UnifiedSidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        homeItem={homeItem}
        moduleTitle="Data Management"
        useGlobalNavigation={true}
      />
      <div className="flex flex-col flex-1">
        <MasterDashNavbar 
          // Add sidebarToggle prop instead of onToggleSidebar to match component definition
          sidebarToggle={toggleSidebar}
          sidebarOpen={sidebarOpen} 
        />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
          <Outlet />
        </main>
        <MasterDashFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
