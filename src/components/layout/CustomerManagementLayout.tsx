
import { Outlet } from 'react-router-dom';
import { UnifiedSidebar } from './UnifiedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { Home, Users, Settings, Clock, BarChart3, UserPlus } from 'lucide-react';
import { NavCategory, NavItem } from './sidebar/types';
import { SidebarProvider } from '@/context/SidebarContext';

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
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen overflow-hidden bg-gray-900">
        <UnifiedSidebar
          items={customerNavItems}
          homeItem={homeNavItem}
          moduleTitle="Customer Management"
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <SharedNavbar moduleTitle="Customer Management" />
          <main className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6",
            "bg-gradient-to-b from-gray-800 to-gray-900"
          )}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CustomerManagementLayout;
