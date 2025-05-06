
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}

export const SidebarToggleButton = ({ open, onToggle }: SidebarToggleButtonProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className={cn(
        "fixed z-40 rounded-full shadow-md bg-white",
        isMobile ? "left-4 bottom-4" : open ? "left-60 bottom-4" : "left-16 bottom-4",
      )}
    >
      {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Button>
  );
};
