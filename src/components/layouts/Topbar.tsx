
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

interface TopbarProps {
  title?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard' }) => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Add content for the right side of the topbar here if needed */}
      </div>
    </div>
  );
};

export default Topbar;
