
import React from 'react';
import { Button } from '../../../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarToggleButtonProps { 
  collapsed?: boolean; 
  onClick?: () => void;
  open?: boolean;
  onToggle?: () => void;
}

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ 
  collapsed, 
  onClick,
  open,
  onToggle
}) => {
  // Support both older collapsed/onClick and newer open/onToggle API
  const isOpen = open !== undefined ? open : !collapsed;
  const handleClick = onToggle || onClick || (() => {});
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed bottom-4 left-4 z-30 rounded-full bg-gray-800 text-white hover:bg-gray-700 shadow-lg"
      onClick={handleClick}
    >
      {isOpen ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </Button>
  );
};
