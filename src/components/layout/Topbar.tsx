
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, Bell, Settings, User } from 'lucide-react';

interface TopbarProps {
  onMenuClick?: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
      <div className="flex items-center">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-4">
            <MenuIcon className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">NXT Platform</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
