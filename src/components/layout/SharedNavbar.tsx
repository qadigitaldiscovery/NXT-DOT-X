
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, UserCircle, Settings as SettingsIcon, Home, BellIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';

interface SharedNavbarProps {
  onMenuClick: () => void;
  moduleTitle?: string;
  notificationArea?: React.ReactNode;
  showSidebarToggle?: boolean;
}

export const SharedNavbar = ({
  onMenuClick,
  moduleTitle = "Application",
  notificationArea,
  showSidebarToggle = false
}: SharedNavbarProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    user,
    logout
  } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // Clean styling for header
  const navbarBgColor = 'bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700';
  const textColor = 'text-gray-700 dark:text-gray-200';
  const iconColor = 'text-gray-500 dark:text-gray-400';
  const hoverBgColor = 'hover:bg-gray-100 dark:hover:bg-gray-700';
  
  return (
    <header className={cn("sticky top-0 z-20 shadow-sm", navbarBgColor)}>
      <div className="flex items-center justify-between h-16 px-4 bg-gray-400 dark:bg-gray-700">
        <div className="flex items-center">
          {showSidebarToggle && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className={cn(iconColor, hoverBgColor, "mr-2")}>
              <MenuIcon className="h-5 w-5" />
            </Button>
          )}
          
          {/* Header text */}
          <div className="flex items-center">
            <h1 className="text-slate-100 font-bold text-xl">{moduleTitle}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <div className="relative z-10">
            <ThemeToggle />
          </div>
          
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(iconColor, hoverBgColor, "rounded-lg relative")}>
                <BellIcon className="h-5 w-5" />
                <Badge variant="destructive" className="h-4 w-4 absolute -top-1 -right-1 flex items-center justify-center p-0 text-xs">2</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col w-full">
                  <span className="font-medium">New project created</span>
                  <span className="text-xs text-muted-foreground">2 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col w-full">
                  <span className="font-medium">System update complete</span>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Settings Button */}
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className={cn(iconColor, hoverBgColor, "rounded-lg")} title="Settings">
            <SettingsIcon className="h-5 w-5" />
          </Button>

          {/* Home Button */}
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className={cn(iconColor, hoverBgColor, "rounded-lg")} title="Home">
            <Home className="h-5 w-5" />
          </Button>

          {/* Module-specific Notification Area */}
          {notificationArea && <div className={cn(iconColor)}>
              {notificationArea}
            </div>}
          
          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("rounded-lg", iconColor, hoverBgColor)}>
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <DropdownMenuLabel className="dark:text-gray-200">{user?.username || 'User'} ({user?.role || 'Unknown'})</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:border-gray-700" />
              {user?.role === 'admin' && <DropdownMenuItem onClick={() => navigate('/admin/users')} className="dark:text-gray-200 dark:hover:bg-gray-700">
                  User Management
                </DropdownMenuItem>}
              <DropdownMenuItem onClick={() => navigate('/settings')} className="dark:text-gray-200 dark:hover:bg-gray-700">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:border-gray-700" />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400 dark:hover:bg-gray-700">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
