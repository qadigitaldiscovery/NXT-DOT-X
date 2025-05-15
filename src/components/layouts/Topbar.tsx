
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

interface TopbarProps {
  title?: string;
  moduleTitle?: string;
  onMenuClick?: () => void;
  showTopLeftToggle?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ 
  title, 
  moduleTitle, 
  onMenuClick, 
  showTopLeftToggle = true
}) => {
  // Use moduleTitle if provided, otherwise fall back to title
  const displayTitle = moduleTitle || title || 'Dashboard';
  
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-4">
        {showTopLeftToggle && onMenuClick && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-medium">{displayTitle}</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Add content for the right side of the topbar here if needed */}
      </div>
    </div>
  );
};

export default Topbar;
