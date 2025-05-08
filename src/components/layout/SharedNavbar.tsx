
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, UserCircle, Settings as SettingsIcon, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface SharedNavbarProps {
  onMenuClick: () => void;
  moduleTitle?: string;
  notificationArea?: React.ReactNode;
}

export const SharedNavbar = ({
  onMenuClick,
  moduleTitle = "Application",
  notificationArea
}: SharedNavbarProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // Enhanced dark theme styles for DOT-X Command Center
  const navbarBgColor = 'bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950';
  const textColor = 'text-white';
  const iconColor = 'text-blue-300';
  const hoverBgColor = 'hover:bg-blue-900/30';
  
  return (
    <header className={cn("sticky top-0 z-20 border-b border-blue-900/50 shadow-md", navbarBgColor)}>
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className={cn(iconColor, hoverBgColor, "mr-2")}>
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          {/* Welcome message in header instead of hero section */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-blue-100">Welcome to DOT-X Command Center</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Action Buttons */}
          <div className="flex gap-2 mr-4">
            <Button className="bg-blue-700 hover:bg-blue-600 text-sm px-3 py-1 h-9 rounded-lg">
              Deploy AI Agents
            </Button>
            <Button variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800/50 text-sm px-3 py-1 h-9 rounded-lg">
              View Mission Log
            </Button>
          </div>

          {/* Settings Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/settings')} 
            className={cn(iconColor, hoverBgColor, "rounded-lg")} 
            title="Settings"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>

          {/* Home Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')} 
            className={cn(iconColor, hoverBgColor, "rounded-lg")} 
            title="Home"
          >
            <Home className="h-5 w-5" />
          </Button>

          {/* Module-specific Notification Area */}
          {notificationArea && (
            <div className={cn(iconColor)}>
              {notificationArea}
            </div>
          )}
          
          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("rounded-lg", iconColor, hoverBgColor)}>
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-slate-900 border-blue-900/50 text-blue-100 shadow-lg" 
            >
              <DropdownMenuLabel className="text-blue-200 font-medium">{user?.username || 'User'} ({user?.role || 'Unknown'})</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-blue-900/30" />
              {user?.role === 'admin' && (
                <DropdownMenuItem onClick={() => navigate('/admin/users')} className="hover:bg-blue-900/50 focus:bg-blue-900/50 text-blue-100">
                  User Management
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-blue-900/50 focus:bg-blue-900/50 text-blue-100">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-blue-900/30" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-900/30 focus:bg-red-900/30 text-red-400 hover:text-red-300">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
