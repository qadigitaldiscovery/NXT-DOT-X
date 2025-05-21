
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SharedSidebar } from './SharedSidebar';
import MasterDashNavbar from '../master-dash/MasterDashNavbar';
import MasterDashFooter from '../master-dash/MasterDashFooter';
import { useIsMobile } from '../../hooks/use-mobile';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();

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
      <div className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-16'} transition-width duration-300 ease-in-out`}>
        <SharedSidebar />
      </div>
      <div className="flex flex-col flex-1">
        <MasterDashNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
          <Outlet />
        </main>
        <MasterDashFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
