
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavItem } from '../types';

interface SidebarHomeItemProps {
  homeItem: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarHomeItem({ homeItem, isActive, onClick }: SidebarHomeItemProps) {
  return (
    <div className="px-3 pt-4">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 mb-2",
          isActive && "bg-gray-800 text-white"
        )}
        onClick={onClick}
      >
        {homeItem.icon && <homeItem.icon className="mr-2 h-5 w-5" />}
        {homeItem.label}
      </Button>
    </div>
  );
}
