
import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { FileCode, Cloud, Settings, BrainCircuit, Box, Database, BarChart3, FileText, LineChart, FileUp, FileCog, FileArchive } from 'lucide-react';
import { Outlet } from 'react-router-dom';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

interface TradingSystemLayoutProps {
  children?: React.ReactNode;
}

const dataManagementNavItems: NavCategory[] = [
  {
    name: "DATA MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Database, path: '/data-management' },
      { label: 'Supplier Costing', icon: Database, path: '/data-management/cost-management' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/data-management/cost-analysis' },
      { 
        label: 'Pricing', 
        icon: LineChart, 
        path: '/data-management/pricing',
        children: [
          { label: 'Competitor Pricing', icon: LineChart, path: '/data-management/pricing/competitor-pricing' },
          { label: 'Price Management', icon: FileCog, path: '/data-management/pricing/price-management' }
        ]
      },
      { label: 'File Uploads', icon: FileUp, path: '/data-management/uploads' },
      { label: 'Document Repository', icon: FileArchive, path: '/data-management/documents' },
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
        navItems={dataManagementNavItems}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Data Management"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
