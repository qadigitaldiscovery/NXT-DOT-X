
import React from 'react';
import { Outlet } from 'react-router-dom';
import MasterDashNavbar from '../master-dash/MasterDashNavbar';
import MasterDashFooter from '../master-dash/MasterDashFooter';
import { SidebarProvider } from '@/context/SidebarContext';

export function NoSidebarLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="flex flex-col flex-1">
          <MasterDashNavbar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
            <Outlet />
          </main>
          <MasterDashFooter />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default NoSidebarLayout;
