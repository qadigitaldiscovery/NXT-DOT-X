
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className={cn(
        "fixed bottom-4 left-4 z-30 flex items-center justify-center",
        "w-10 h-10 text-white hover:text-gray-200"
      )}
      aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
    >
      {isOpen ? (
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      )}
    </a>
  );
};
