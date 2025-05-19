
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem } from './types';

interface CompactSidebarProps {
  navItems: NavItem[];
}

export const CompactSidebar: React.FC<CompactSidebarProps> = ({
  navItems,
}) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col items-center space-y-4 py-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
        const Icon = item.icon;

        return (
          <div 
            key={item.path || item.label} 
            className="relative group"
            aria-label={item.label}
          >
            <a
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-10 h-10 rounded-md",
                isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-indigo-900/50 hover:text-white",
                "transition-colors"
              )}
            >
              {Icon && <Icon className="h-5 w-5" />}
            </a>
            
            {/* Tooltip */}
            <div className="absolute left-12 px-2 py-1 bg-gray-800 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompactSidebar;
