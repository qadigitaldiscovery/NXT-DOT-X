import { useState, useEffect } from 'react';
import { MainSidebar } from './sidebar/MainSidebar/MainSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings, Database, BarChart3, FileUp } from 'lucide-react';
import { NavCategory, NavItem } from './sidebar/types';

interface CustomerManagementLayoutProps {
  children?: React.ReactNode;
}

const customerNavItems: NavCategory[] = [
  {
    name: "CUSTOMER MANAGEMENT",
    label: "CUSTOMER MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Database, path: '/customer-management' },
      { label: 'Customer Directory', icon: Users, path: '/customer-management/directory' },
      { label: 'Customer Settings', icon: Settings, path: '/customer-management/settings' },
      { label: 'Customer Analytics', icon: BarChart3, path: '/customer-analytics' },
      { label: 'Upload Files', icon: FileUp, path: '/data-management/uploads' }
    ]
  }
];

const homeNavItem: NavItem = { label: 'Master Dashboard', icon: Home, path: '/' };

export const CustomerManagementLayout = ({ children }: CustomerManagementLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <MainSidebar 
        open={sidebarOpen} 
        onToggle={toggleSidebar} 
        items={customerNavItems}
        homeItem={homeNavItem}
        useGlobalNavigation={false}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Customer Management"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
