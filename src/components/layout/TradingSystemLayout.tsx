
import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, Package, Truck, BarChart3, Settings, FileCode, Cloud } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

interface TradingSystemLayoutProps {
  children: React.ReactNode;
}

const techHubNavItems: NavCategory[] = [
  {
    name: "Tech Hub Menu",
    items: [
      { label: 'Dashboard', icon: Home, path: '/tech-hub' },
      { label: 'Orders', icon: ShoppingCart, path: '/tech-hub/orders' },
      { label: 'Inventory', icon: Package, path: '/tech-hub/inventory' },
      { label: 'Logistics', icon: Truck, path: '/tech-hub/logistics' },
      { label: 'Analytics', icon: BarChart3, path: '/tech-hub/analytics' },
      { label: 'API Management', icon: FileCode, path: '/tech-hub/api-management' },
      { label: 'Cloud Services', icon: Cloud, path: '/tech-hub/cloud-services' },
      { label: 'Settings', icon: Settings, path: '/tech-hub/settings' },
    ]
  }
];

export const TradingSystemLayout = ({ children }: TradingSystemLayoutProps) => {
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
        navItems={techHubNavItems}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Tech Hub"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
