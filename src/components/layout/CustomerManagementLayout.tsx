
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
    <div className="flex h-screen overflow-hidden">
      <MainSidebar 
        open={sidebarOpen} 
        onToggle={toggleSidebar} 
        items={customerNavItems}
        homeItem={homeNavItem}
        useGlobalNavigation={false}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Customer Management"
        />
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6",
          "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"
        )}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
