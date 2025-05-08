
import React from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';
import { BarChart3, Bot, Shield, Users, Settings, Zap, Brain } from 'lucide-react';

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
    name: "NAVIGATION",
    items: [
      { label: 'Mission Control', icon: BarChart3, path: '/dot-x' },
      { label: 'AI Agents', icon: Bot, path: '/dot-x/ai-agents' },
      { label: 'Neural Shield', icon: Shield, path: '/dot-x/security' },
      { label: 'Team Members', icon: Users, path: '/dot-x/users' },
      { label: 'Command Settings', icon: Settings, path: '/dot-x/settings' },
      { label: 'Power Center', icon: Zap, path: '/dot-x/power' },
      { label: 'Intelligence Hub', icon: Brain, path: '/dot-x/intelligence' },
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
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 text-white">
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
          moduleTitle="DOT-X COMMAND CENTER"
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
