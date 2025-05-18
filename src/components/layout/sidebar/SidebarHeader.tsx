import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarHeaderProps {
  open: boolean;
  onToggle: () => void;
}

export const SidebarHeader = ({ open, onToggle }: SidebarHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex items-center justify-between p-4 border-b border-sidebar-border",
      !open && "md:justify-center"
    )}>
      <div className={cn(
        "flex items-center space-x-2",
        !open && "md:hidden"
      )}>
        {open ? (
          <img
            src="/lovable-uploads/80f9379c-254b-4238-9d1c-bb90577397d9.png"
            alt="NXT DOT X"
            className="h-8"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-white font-bold">NX</span>
          </div>
        )}
      </div>
      
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground md:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
