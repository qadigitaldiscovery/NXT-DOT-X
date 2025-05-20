
import { useState, useEffect } from 'react';
import { MainSidebar } from './sidebar/MainSidebar/MainSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings, Clock, BarChart3, UserPlus } from 'lucide-react';
import { NavCategory, NavItem } from './sidebar/types';
11 |
const customerNavItems: NavCategory[] = [
  {
    name: "CUSTOMER MANAGEMENT",
    label: "CUSTOMER MANAGEMENT",
    items: [
      { label: 'Customer Directory', icon: Users, path: '/customer-management/directory' },
      { label: 'Add New Customer', icon: UserPlus, path: '/customer-management/new' },
      { label: 'Interaction History', icon: Clock, path: '/customer-management/history' },
      { label: 'Customer Analytics', icon: BarChart3, path: '/customer-management/analytics' },
      { label: 'Customer Settings', icon: Settings, path: '/customer-management/settings' },
    ]
  }
];

const homeNavItem: NavItem = { label: 'Back to Dashboard', icon: Home, path: '/master' };

export const CustomerManagementLayout = () => {
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
   <div className="flex h-screen overflow-hidden bg-gray-900">
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
          "bg-gradient-to-b from-gray-800 to-gray-900"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerManagementLayout;
