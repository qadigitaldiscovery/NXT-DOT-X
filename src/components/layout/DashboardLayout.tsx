
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MasterDashSidebar from '../master-dash/MasterDashSidebar';
import MasterDashNavbar from '../master-dash/MasterDashNavbar';
import MasterDashFooter from '../master-dash/MasterDashFooter';
import { useIsMobile } from '../../hooks/use-mobile';

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
      <MasterDashSidebar 
        activePath={window.location.pathname}
        open={sidebarOpen}
        onToggle={toggleSidebar}
      />
      <div className="flex flex-col flex-1">
        <MasterDashNavbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
        <MasterDashFooter/>
      </div>
    </div>
  );
}

export default DashboardLayout;
