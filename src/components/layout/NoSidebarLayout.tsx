
import React from 'react';
import { Outlet } from 'react-router-dom';
import MasterDashNavbar from '../master-dash/MasterDashNavbar';
import MasterDashFooter from '../master-dash/MasterDashFooter';

export function NoSidebarLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <MasterDashNavbar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
      <MasterDashFooter />
    </div>
  );
}

export default NoSidebarLayout;
