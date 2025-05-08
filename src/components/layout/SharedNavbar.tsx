import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, UserCircle, Settings as SettingsIcon, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  const {
    user,
    logout
  } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // Simple clean styling for header
  const navbarBgColor = 'bg-white border-b border-gray-200';
  const textColor = 'text-gray-700';
  const iconColor = 'text-gray-500';
  const hoverBgColor = 'hover:bg-gray-100';
  return <header className={cn("sticky top-0 z-20 shadow-sm", navbarBgColor)}>
      <div className="flex items-center justify-between h-16 px-4 bg-gray-400">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className={cn(iconColor, hoverBgColor, "mr-2")}>
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          {/* Simple header text */}
          <div className="flex items-center">
            <h1 className="text-slate-100 font-bold text-xl">{moduleTitle}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
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
            <DropdownMenuContent align="end" className="w-56 border-gray-200">
              <DropdownMenuLabel>{user?.username || 'User'} ({user?.role || 'Unknown'})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user?.role === 'admin' && <DropdownMenuItem onClick={() => navigate('/admin/users')}>
                  User Management
                </DropdownMenuItem>}
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};