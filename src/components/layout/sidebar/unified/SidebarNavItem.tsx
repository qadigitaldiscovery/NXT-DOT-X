
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavItem } from '../types';

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarNavItem({ item, isActive, onClick }: SidebarNavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 py-1.5 h-auto",
        isActive && "bg-gray-800/50 text-white"
      )}
      onClick={onClick}
    >
      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
      <span className="text-sm">{item.label}</span>
    </Button>
  );
}
