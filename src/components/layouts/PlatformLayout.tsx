
import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Topbar from '@/components/layouts/Topbar';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        open={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title="Platform Dashboard" />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PlatformLayout;
