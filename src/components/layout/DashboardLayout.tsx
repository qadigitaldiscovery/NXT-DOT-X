
import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    // Close sidebar by default on mobile
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isMobile && sidebarOpen ? "ml-0" : !isMobile && sidebarOpen ? "md:ml-64" : "md:ml-16"
        )}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-200",
            isMobile && sidebarOpen && "opacity-50"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
