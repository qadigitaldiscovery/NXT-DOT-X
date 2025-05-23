
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, Home, BarChart3, Settings, Gift, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Beta2LayoutProps {
  children: React.ReactNode;
}

export const Beta2Layout = ({
  children
}: Beta2LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    // Close sidebar by default on mobile
    if (!isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && isMobile && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div className="bg-slate-400">
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className={`flex items-center space-x-2 ${!sidebarOpen && 'md:hidden'}`}>
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">LP</span>
            </div>
            <h1 className="font-bold text-xl">Loyalty Pro</h1>
          </div>
          {sidebarOpen && <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleSidebar}>
              <ChevronLeft className="h-4 w-4" />
            </Button>}
        </div>
        
        {/* Sidebar content */}
        <nav className="p-4">
          <div className={`space-y-2 ${!sidebarOpen && 'md:flex md:flex-col md:items-center'}`}>
            <NavLink to="/beta2" className={({
            isActive
          }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen && 'md:justify-center md:px-2'}`}>
              {!sidebarOpen && !isMobile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Home className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <Home className="h-5 w-5" />
                  {sidebarOpen && <span>Dashboard</span>}
                </>
              )}
            </NavLink>
            
            <NavLink to="/beta2/members" className={({
            isActive
          }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen && 'md:justify-center md:px-2'}`}>
              {!sidebarOpen && !isMobile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Users className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Members</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  {sidebarOpen && <span>Members</span>}
                </>
              )}
            </NavLink>
            
            <NavLink to="/beta2/rewards" className={({
            isActive
          }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen && 'md:justify-center md:px-2'}`}>
              {!sidebarOpen && !isMobile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Gift className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Rewards</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <Gift className="h-5 w-5" />
                  {sidebarOpen && <span>Rewards</span>}
                </>
              )}
            </NavLink>
            
            <NavLink to="/beta2/analytics" className={({
            isActive
          }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen && 'md:justify-center md:px-2'}`}>
              {!sidebarOpen && !isMobile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <BarChart3 className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Analytics</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <BarChart3 className="h-5 w-5" />
                  {sidebarOpen && <span>Analytics</span>}
                </>
              )}
            </NavLink>
            
            <NavLink to="/beta2/settings" className={({
            isActive
          }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen && 'md:justify-center md:px-2'}`}>
              {!sidebarOpen && !isMobile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Settings className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <Settings className="h-5 w-5" />
                  {sidebarOpen && <span>Settings</span>}
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b flex items-center px-4 shadow-sm">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="mr-4">
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-bold">Loyalty Program Manager</h1>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
