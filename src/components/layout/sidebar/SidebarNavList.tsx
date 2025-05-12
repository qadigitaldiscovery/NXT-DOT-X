
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavCategory, NavItem } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavListProps {
  navItems: NavCategory[];
  userRole?: string;
  expandedItems: string[];
  onToggleExpand: (label: string) => void;
  textColor: string;
  textHoverColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
}

export const SidebarNavList: React.FC<SidebarNavListProps> = ({
  navItems,
  userRole,
  expandedItems,
  onToggleExpand,
  textColor,
  textHoverColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor
}) => {
  const location = useLocation();

  return (
    <div className="space-y-4">
      {navItems.map((category) => {
        const isExpanded = expandedItems.includes(category.name);

        return (
          <div key={category.name}>
            <div 
              className={cn("flex items-center justify-between px-3 py-2 cursor-pointer text-xs font-semibold uppercase tracking-wide text-blue-300 hover:text-blue-100")}
              onClick={() => onToggleExpand(category.name)}
            >
              {category.name}
              {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>

            {isExpanded && (
              <div className="space-y-1">
                {category.items
                  .filter((item: NavItem) =>
                    !item.roles || item.roles.includes(userRole || '')
                  )
                  .map((item: NavItem) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          textColor,
                          hoverBgColor,
                          textHoverColor,
                          isActive && activeBgColor,
                          isActive && activeTextColor
                        )}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
