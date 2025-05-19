import { useState, useEffect } from 'react';
import { MainSidebar } from './sidebar/MainSidebar/MainSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings, Database, BarChart3, FileUp } from 'lucide-react';
import { NavCategory, NavItem } from './sidebar/types';

interface SupplierManagementLayoutProps {
  children?: React.ReactNode;
}

const supplierNavItems: NavCategory[] = [
  {
    name: "SUPPLIER MANAGEMENT",
    label: "Supplier Management",
    items: [
      { label: 'Dashboard', icon: Database, path: '/supplier-management' },
      { label: 'Supplier Directory', icon: Users, path: '/supplier-management/directory' },
      { label: 'Supplier Settings', icon: Settings, path: '/supplier-management/settings' },
      { label: 'Supplier Costing', icon: BarChart3, path: '/supplier-costing' },
      { label: 'Upload Files', icon: FileUp, path: '/data-management/uploads' }
    ]
  }
];

const homeNavItem: NavItem = { label: 'Master Dashboard', icon: Home, path: '/' };

export const SupplierManagementLayout = ({ children }: SupplierManagementLayoutProps) => {
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
        items={supplierNavItems}
        homeItem={homeNavItem}
        useGlobalNavigation={false}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Supplier Management"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
