import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, User, Settings, Bell, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

interface SharedNavbarProps {
  onMenuClick: () => void;
  moduleTitle?: string;
}

export function SharedNavbar({ onMenuClick, moduleTitle }: SharedNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const getTitle = () => {
    if (moduleTitle) return moduleTitle;
    
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    
    // Format the path into a readable title (e.g., "/data-management/settings" -> "Data Management / Settings")
    return path.split('/').filter(Boolean).map(
      word => word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, ' ')
    ).join(' / ');
  };

  const handleSettingsClick = () => {
    navigate('/settings/billing');
  };

  const handleProfileClick = () => {
    navigate('/admin/users/profile');
  };

  const handleLogoutClick = async () => {
    try {
      await signOut();
      navigate('/landing');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 flex h-14 items-center justify-between border-b",
      "bg-gradient-to-r from-redmetal-800 to-black text-white",
      "px-4 sm:px-6"
    )}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-redmetal-700 mr-2" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-redmetal-700"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-redmetal-700"
          onClick={handleSettingsClick}
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-redmetal-700"
          onClick={handleProfileClick}
        >
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-redmetal-700"
          onClick={handleLogoutClick}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
