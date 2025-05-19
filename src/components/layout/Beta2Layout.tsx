<<<<<<< Updated upstream

import React from 'react';
=======
>>>>>>> Stashed changes
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';

export function Beta2Layout() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Implement menu toggle functionality if needed
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="flex flex-1">
        <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
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

export default Beta2Layout;
