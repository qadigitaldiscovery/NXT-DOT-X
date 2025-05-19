<<<<<<< Updated upstream

import React from 'react';
=======
>>>>>>> Stashed changes
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';

export function Beta1Layout() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Implement menu toggle functionality if needed
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar className="border-r">
          {/* Sidebar content can be added here if needed */}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <SharedNavbar onMenuClick={handleMenuClick} />
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Beta1Layout;
