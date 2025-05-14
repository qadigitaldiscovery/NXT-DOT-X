
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={handleToggleSidebar} />
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
