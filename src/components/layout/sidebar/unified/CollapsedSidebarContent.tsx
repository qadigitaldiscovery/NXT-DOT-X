
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavCategory, NavItem } from '../types';

interface CollapsedSidebarContentProps {
  homeItem?: NavItem;
  navItems: NavCategory[];
  isItemActive: (item: NavItem) => boolean;
  handleItemClick: (item: NavItem) => void;
}

export function CollapsedSidebarContent({ 
  homeItem, 
  navItems, 
  isItemActive, 
  handleItemClick 
}: CollapsedSidebarContentProps) {
  return (
    <div className="flex flex-col items-center py-4 overflow-y-auto">
      {/* Home item in collapsed view */}
      {homeItem && (
        <Button
          variant="ghost"
          className={cn(
            "w-10 h-10 p-0 mb-4 text-gray-300 hover:text-white hover:bg-gray-800",
            isItemActive(homeItem) && "bg-gray-800 text-white"
          )}
          onClick={() => handleItemClick(homeItem)}
          title={homeItem.label}
        >
          {homeItem.icon && <homeItem.icon className="h-5 w-5" />}
        </Button>
      )}
      
      {/* Show only icons for items in collapsed view */}
      {navItems.flatMap(category => 
        category.items?.map((item, index) => (
          <Button
            key={`icon-${item.label}-${index}`}
            variant="ghost"
            className={cn(
              "w-10 h-10 p-0 mb-1 text-gray-300 hover:text-white hover:bg-gray-800",
              isItemActive(item) && "bg-gray-800 text-white"
            )}
            onClick={() => handleItemClick(item)}
            title={item.label}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
          </Button>
        ))
      )}
    </div>
  );
}
