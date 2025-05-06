
import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen || !isMobile} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={toggleSidebar} />
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-200",
          isMobile && sidebarOpen && "opacity-50"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};
