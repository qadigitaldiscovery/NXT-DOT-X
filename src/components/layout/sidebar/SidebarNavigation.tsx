import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavCategory, NavItem } from './types';
import { ChevronDown } from 'lucide-react';

interface SidebarNavigationProps {
  categories: NavCategory[];
  userRole?: string;
}

export function SidebarNavigation({ categories, userRole }: SidebarNavigationProps) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Toggle a category's expanded state
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName) 
        : [...prev, categoryName]
    );
  };

  // Filter items based on user role
  const filterItemsByRole = (items: NavItem[], role?: string): NavItem[] => {
    if (!role) return items;
    
    return items.filter(item => {
      // If no roles specified, everyone can see it
      if (!item.roles || item.roles.length === 0) return true;
      
      // Otherwise, check if user role is in the allowed roles
      return item.roles.includes(role);
    });
  };

  // Process categories, filtering by role
  const visibleCategories = categories
    .map(category => ({
      ...category,
      items: filterItemsByRole(category.items, userRole)
    }))
    .filter(category => category.items.length > 0);

  return (
    <div className="space-y-1">
      {visibleCategories.map((category) => {
        const categoryName = category.name || category.label || '';
        const isExpanded = expandedCategories.includes(categoryName);
        
        return (
          <div key={categoryName} className="mb-4">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(categoryName)}
              className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-blue-200 hover:text-blue-100 rounded-md"
            >
              <span>{category.label || category.name}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isExpanded ? "transform rotate-180" : ""
                )} 
              />
            </button>
            
            {/* Category Items */}
            {isExpanded && (
              <div className="mt-1 ml-2 pl-2 border-l border-indigo-800">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const href = item.href || item.path || '#';
                  const isActive = location.pathname === href || 
                                  (href !== '/' && location.pathname.startsWith(href));
                  
                  if (href === '#') {
                    return (
                      <div
                        key={item.label}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-md my-1 cursor-pointer",
                          "text-blue-200 hover:text-white hover:bg-indigo-900/50"
                        )}
                      >
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        <span>{item.label}</span>
                      </div>
                    );
                  }
                  
                  return (
                    <NavLink
                      key={item.label}
                      to={href}
                      className={({ isActive: routeActive }) => cn(
                        "flex items-center px-3 py-2 text-sm rounded-md my-1",
                        (isActive || routeActive)
                          ? "bg-gradient-to-r from-blue-800 to-indigo-700 text-white"
                          : "text-blue-200 hover:text-white hover:bg-indigo-900/50"
                      )}
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
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
} 