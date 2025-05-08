import React from 'react';
import { cn } from '@/lib/utils';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings, FileCode } from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
};

type NavCategory = {
  name: string;
  items: NavItem[];
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

// Dashboard navigation items
const dashboardNavItems: NavCategory[] = [
  {
    name: "Navigation",
    items: [
      { label: 'Home', icon: Home, path: '/' }
    ]
  },
  {
    name: "Dashboard",
    items: [
      { label: 'Dashboard Home', icon: Home, path: '/dashboard' }
    ]
  },
  {
    name: "Cost Management",
    items: [
      { label: 'Supplier Costing', icon: FileUp, path: '/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/cost-analysis' }
    ]
  },
  {
    name: "Pricing",
    items: [
      { label: 'Competitor Pricing', icon: LineChart, path: '/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/price-management' }
    ]
  },
  {
    name: "Data",
    items: [
      { label: 'Export Data', icon: FileDown, path: '/export-data' },
      { label: 'APIs', icon: FileCode, path: '/data-management/apis' }
    ]
  }
];

export const DashboardLayout = ({ children, fullWidth = false }: DashboardLayoutProps) => {
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
        navItems={dashboardNavItems}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-0" : "md:ml-0",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Dashboard"
        />
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50",
          fullWidth ? "container-fluid" : "container mx-auto"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};
