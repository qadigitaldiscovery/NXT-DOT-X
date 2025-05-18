
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-10 h-10 rounded-lg bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"
        onClick={handleDashboardClick}
        title="Dashboard"
      >
        <Home className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-10 h-10 rounded-lg bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"
        onClick={handleSettingsClick}
        title="Settings"
      >
        <Settings className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-10 h-10 rounded-lg bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"
        onClick={handleHelpClick}
        title="Help"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};
