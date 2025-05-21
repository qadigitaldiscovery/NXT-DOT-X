
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavCategory, NavItem } from '../types';
import { SidebarNavItem } from './SidebarNavItem';

interface SidebarCategoryProps {
  category: NavCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: (item: NavItem) => void;
  isItemActive: (item: NavItem) => boolean;
  isMobile?: boolean;
}

export function SidebarCategory({
  category,
  isExpanded,
  onToggle,
  onItemClick,
  isItemActive,
  // isMobile parameter is intentionally not destructured as it's not used directly
}: SidebarCategoryProps) {
  return (
    <div className="mb-3">
      {/* Category Header */}
      <Button
        variant="ghost"
        className="w-full justify-between items-center text-gray-400 hover:text-white hover:bg-gray-800/30 py-2"
        onClick={onToggle}
      >
        <span className="text-xs font-semibold uppercase tracking-wider">
          {category.label || category.name}
        </span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      
      {/* Category Items */}
      {isExpanded && (
        <div className="pl-2 space-y-1 mt-1">
          {category.items.map((item) => (
            <SidebarNavItem
              key={item.path || item.href || item.label}
              item={item}
              isActive={isItemActive(item)}
              onClick={() => onItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
