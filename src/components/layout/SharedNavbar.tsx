import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, UserCircle, Settings as SettingsIcon } from 'lucide-react'; // BellIcon removed
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
// Notification-specific hooks and Badge removed
// import { useSupplierCosts } from '@/hooks/use-supplier-costs'; 
// import { useSupplierUploads } from '@/hooks/use-supplier-uploads';
// import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface SharedNavbarProps {
  onMenuClick: () => void;
  moduleTitle?: string;
  notificationArea?: React.ReactNode; // New prop for module-specific notifications
}

export const SharedNavbar = ({
  onMenuClick,
  moduleTitle = "Application",
  notificationArea // Destructure new prop
}: SharedNavbarProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Notification logic removed
  // const { data: pendingCosts = [] } = useSupplierCosts({ status: 'pending_approval' });
  // const { data: pendingUploads = [] } = useSupplierUploads();
  // const totalPending = pendingCosts.length + pendingUploads.filter(u => u.status === 'pending').length;
  
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // Light theme for Profitcal style
  const navbarBgColor = 'bg-white';
  const textColor = 'text-gray-700'; // Darker text for light background
  const iconColor = 'text-gray-500'; // Slightly muted icons
  const hoverBgColor = 'hover:bg-gray-100';
  // const borderColor = 'border-gray-200'; // Border color variable removed/unused
  
  return (
    <header className={cn("sticky top-0 z-20", navbarBgColor /* removed borderColor */)}>
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className={cn(iconColor, hoverBgColor)}>
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="ml-4">
            <h1 className={cn("text-xl font-semibold", textColor)}>{moduleTitle}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Settings Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/settings')} 
            className={cn(iconColor, hoverBgColor)} 
            title="Settings"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>

          {/* Module-specific Notification Area */}
          {notificationArea && <div className={cn(iconColor)}>{notificationArea}</div>}
          
          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("rounded-full", iconColor, hoverBgColor)}>
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white border-gray-200 text-gray-700 shadow-lg" // Light theme dropdown
            >
              <DropdownMenuLabel className="text-gray-800 font-medium">{user?.username || 'User'} ({user?.role || 'Unknown'})</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              {user?.role === 'admin' && (
                <DropdownMenuItem onClick={() => navigate('/admin/users')} className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
                  User Management
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 focus:bg-red-50 text-red-600 hover:text-red-700">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}; 