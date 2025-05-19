import React from 'react';
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';

export function DashboardLayout() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Implement menu toggle functionality if needed
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1">
        <Sidebar className="border-r bg-white">
          {/* Sidebar content can be added here if needed */}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <SharedNavbar onMenuClick={handleMenuClick} />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
