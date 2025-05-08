
import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';
import { Bot, Shield, Users, Settings, BarChart3 } from 'lucide-react';

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

const dotXNavItems: NavCategory[] = [
  {
    name: "DOT-X Menu",
    items: [
      { label: 'Dashboard', icon: BarChart3, path: '/dot-x' },
      { label: 'AI Agents', icon: Bot, path: '/dot-x/ai-agents' },
      { label: 'Security', icon: Shield, path: '/dot-x/security' },
      { label: 'User Management', icon: Users, path: '/dot-x/users' },
      { label: 'Settings', icon: Settings, path: '/dot-x/settings' },
    ]
  }
];

export const DotXLayout = () => {
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
        navItems={dotXNavItems}
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          "md:rounded-tl-xl"
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle={
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-xl font-bold">DOT-</span>
                <span className="text-3xl font-bold">X</span>
              </div>
              <div className="text-xs text-gray-400 -mt-1">AND HIS AI ARMY</div>
            </div>
          }
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
