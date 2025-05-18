
import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './sidebar/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, User, Settings, BarChart3, Calendar } from 'lucide-react';

interface Beta2LayoutProps {
  children: React.ReactNode;
}

export const Beta2Layout = ({ children }: Beta2LayoutProps) => {
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
      <Sidebar 
        open={sidebarOpen} 
        onToggle={toggleSidebar} 
        items={[
          {
            name: "Navigation",
            label: "Navigation",
            items: [
              { label: 'Dashboard', icon: Home, path: '/beta-2' },
              { label: 'Members', icon: User, path: '/beta-2/members' },
              { label: 'Rewards', icon: Calendar, path: '/beta-2/rewards' },
              { label: 'Analytics', icon: BarChart3, path: '/beta-2/analytics' },
              { label: 'Settings', icon: Settings, path: '/beta-2/settings' }
            ]
          }
        ]} 
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
