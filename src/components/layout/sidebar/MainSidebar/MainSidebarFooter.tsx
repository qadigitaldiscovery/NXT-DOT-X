
import React from 'react';
import { Home, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const MainSidebarFooter: React.FC = () => {
  const navigate = useNavigate();
  
  const handleDashboardClick = () => {
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleHelpClick = () => {
    toast.info('Help documentation will be available soon');
  };

  return (
    <div className="flex justify-center space-x-2 bg-indigo-950/80 border-t border-indigo-900/50 py-3">
      <a 
        href="/"
        onClick={(e) => {
          e.preventDefault();
          handleDashboardClick();
        }}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg",
          "bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"
        )}
        aria-label="Dashboard"
      >
        <Home className="h-5 w-5" aria-hidden="true" />
      </a>
      <a 
        href="/settings"
        onClick={(e) => {
          e.preventDefault();
          handleSettingsClick();
        }}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg",
          "bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"
        )}
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" aria-hidden="true" />
      </a>
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleHelpClick();
        }}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg",
          "bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"
        )}
        aria-label="Help"
      >
        <HelpCircle className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
};
