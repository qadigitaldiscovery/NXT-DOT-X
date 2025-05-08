
import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Home, Users, Gift, BarChart3, Settings, BrainCircuit } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

interface LoyaltyLayoutProps {
  children: React.ReactNode;
}

const loyaltyNavItems: NavCategory[] = [
  {
    name: "Loyalty Menu",
    items: [
      { label: 'Dashboard', icon: Home, path: '/loyalty-rewards' },
      { label: 'Members', icon: Users, path: '/loyalty-rewards/members' },
      { label: 'Rewards', icon: Gift, path: '/loyalty-rewards/rewards' },
      { label: 'Analytics', icon: BarChart3, path: '/loyalty-rewards/analytics' },
      { label: 'Settings', icon: Settings, path: '/loyalty-rewards/settings' },
    ]
  },
  {
    name: "Tech Hub",
    items: [
      { label: 'AI Personas', icon: BrainCircuit, path: '/tech-hub/personas' },
    ]
  }
];

export const LoyaltyLayout = ({ children }: LoyaltyLayoutProps) => {
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
        navItems={loyaltyNavItems}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle="Loyalty Rewards"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
