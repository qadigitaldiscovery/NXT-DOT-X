
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  moduleTitle: string;
}

export function SidebarHeader({ isOpen, onToggle, moduleTitle }: SidebarHeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 text-white px-4">
      {isOpen && <span className="font-semibold truncate">{moduleTitle}</span>}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="h-8 w-8 p-0 text-white hover:bg-gray-800"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
    </div>
  );
}
