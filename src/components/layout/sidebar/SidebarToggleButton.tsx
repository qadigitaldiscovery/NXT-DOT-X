
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarToggleButtonProps } from './types';

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
      className="fixed bottom-4 left-4 z-30 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
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
