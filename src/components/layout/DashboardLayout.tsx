import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '../ui/sidebar';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1">
        <div className={cn(
          "fixed inset-y-0 z-50 transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0"
        )}>
          <Sidebar className="h-full border-r bg-white" />
        </div>
        
        <div className="flex-1 flex flex-col">
          <SharedNavbar 
            onMenuClick={handleMenuClick}
          />
          <main className={cn(
            "flex-1 overflow-auto p-6 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "md:ml-64" : "ml-0"
          )}>
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
