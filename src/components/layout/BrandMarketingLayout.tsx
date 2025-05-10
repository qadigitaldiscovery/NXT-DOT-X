
import React from 'react';
import { cn } from '@/lib/utils';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, Award, BarChart3, LineChart, TrendingUp, Settings, BadgePercent, Globe, Search, MessageCircle } from 'lucide-react';

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

interface BrandMarketingLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

// Brand Marketing navigation items
const brandNavItems: NavCategory[] = [
  {
    name: "Navigation",
    items: [
      { label: 'Home', icon: Home, path: '/' }
    ]
  },
  {
    name: "Brand Management",
    items: [
      { label: 'Brand Dashboard', icon: Award, path: '/brand-marketing' },
      { label: 'Brand Analytics', icon: BarChart3, path: '/brand-marketing/analytics' },
      { label: 'Trust Analysis', icon: BadgePercent, path: '/brand-marketing/trust-analysis' },
      { label: 'Market Perception', icon: TrendingUp, path: '/brand-marketing/market-perception' },
      { label: 'SEO & Keywords', icon: Search, path: '/brand-marketing/seo' },
      { label: 'Requesty AI', icon: MessageCircle, path: '/brand-marketing/requesty' }
    ]
  },
  {
    name: "Configuration",
    items: [
      { label: 'Brand Settings', icon: Settings, path: '/brand-marketing/settings' }
    ]
  }
];

export const BrandMarketingLayout = ({ children, fullWidth = false }: BrandMarketingLayoutProps) => {
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
        navItems={brandNavItems}
        homeItem={{ label: 'Master Dashboard', icon: Home, path: '/' }}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-0" : "md:ml-0",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Brand Marketing"
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
