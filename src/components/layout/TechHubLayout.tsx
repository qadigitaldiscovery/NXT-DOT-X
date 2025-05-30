import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { BrainCircuit, Bot, Cloud, Cog, Home, Link, Database, ShoppingCart } from 'lucide-react';
import { NavItem as SidebarNavItem, NavCategory as SidebarNavCategory } from './sidebar/types';

interface NavItem extends Omit<SidebarNavItem, 'path'> {
  path: string;
}

interface NavCategory extends Omit<SidebarNavCategory, 'items'> {
  items: NavItem[];
}

interface TechHubLayoutProps {
  children: React.ReactNode;
}

const techHubNavItems: NavCategory[] = [
  {
    label: "TECH HUB",
    name: "TECH HUB",
    items: [
      { label: 'AI Personas', icon: BrainCircuit, path: '/tech-hub/personas' },
      { label: 'API Management', icon: Bot, path: '/tech-hub/api-management' },
      { 
        label: 'Integrations', 
        icon: Link, 
        path: '/tech-hub/integrations',
        children: [
          { label: 'Odoo ERP', icon: Database, path: '/tech-hub/integrations/odoo' },
          { label: 'WooCommerce', icon: ShoppingCart, path: '/tech-hub/integrations/woocommerce' },
        ] 
      },
      { label: 'Cloud Services', icon: Cloud, path: '/tech-hub/cloud-services' },
      { label: 'Settings', icon: Cog, path: '/tech-hub/settings' },
    ]
  }
];

// Add home item that will be shown at the bottom of sidebar
const homeNavItem: NavItem = { label: 'Master Dashboard', icon: Home, path: '/' };

export const TechHubLayout = ({ children }: TechHubLayoutProps) => {
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
        homeItem={homeNavItem}
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
