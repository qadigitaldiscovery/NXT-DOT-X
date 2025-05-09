
import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings, Database, BarChart3, FileUp } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

interface SupplierManagementLayoutProps {
  children?: React.ReactNode;
}

const supplierNavItems: NavCategory[] = [
  {
    name: "SUPPLIER MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Database, path: '/supplier-management' },
      { label: 'Supplier Directory', icon: Users, path: '/supplier-management/directory' },
      { label: 'Supplier Settings', icon: Settings, path: '/supplier-management/settings' },
      { label: 'Supplier Costing', icon: BarChart3, path: '/supplier-costing' },
      { label: 'Upload Files', icon: FileUp, path: '/data-management/uploads' }
    ]
  }
];

// Add home item that will be shown at the bottom of sidebar
const homeNavItem: NavItem = { label: 'Master Dashboard', icon: Home, path: '/' };

export const SupplierManagementLayout = ({ children }: SupplierManagementLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();

  React.useEffect(() => {
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
      <SharedSidebar 
        open={sidebarOpen} 
        onToggle={toggleSidebar} 
        navItems={supplierNavItems}
        homeItem={homeNavItem}
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
