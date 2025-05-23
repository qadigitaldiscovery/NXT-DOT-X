
import React, { useState, useEffect } from 'react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Bot, Shield, Users, Settings, Zap, Brain, Home, Code, Database } from 'lucide-react';
import { NavCategory } from './sidebar/types';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const dotXNavItems: NavCategory[] = [
  {
    name: "NAVIGATION",
    label: "Navigation",
    items: [
      { label: 'Mission Control', icon: BarChart3, path: '/dot-x' },
      { label: 'DOT-X-2', icon: Zap, path: '/dot-x/dot-x-2' },
      { label: 'API Integration', icon: Code, path: '/dot-x/api' },
      { label: 'Neural Shield', icon: Shield, path: '/dot-x/security' },
      { label: 'Team Members', icon: Users, path: '/dot-x/users' },
      { label: 'Command Settings', icon: Settings, path: '/dot-x/settings' },
      { label: 'Data Services', icon: Database, path: '/dot-x/data-services' },
      { label: 'Home', icon: Home, path: '/' }, 
    ]
  }
];

export const DotXLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Handle authentication state
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to landing");
        toast.error("Please log in to access this area");
        navigate('/landing', { replace: true });
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle sidebar state based on device
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

  // Show loading state while authentication is being checked
  if (authLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 text-white">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin mb-4 mx-auto"></div>
          <p className="text-indigo-300">Loading secure environment...</p>
        </div>
      </div>
    );
  }

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
