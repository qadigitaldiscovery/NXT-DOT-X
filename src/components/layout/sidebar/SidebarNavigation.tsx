import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavCategory, NavItem } from './types';

export function SidebarNavigation({ categories, userRole }: SidebarNavigationProps) {
  const location = useLocation();
  // Initialize with all categories expanded
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map(cat => cat.name || cat.label || '')
  );

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

  console.log('SidebarNavigation - Visible Categories:', visibleCategories);
  console.log('SidebarNavigation - Current Location:', location.pathname);

  // Improved function to check if a route is active
  const isRouteActive = (href: string): boolean => {
    // Exact match
    if (location.pathname === href) return true;
    
    // Special case for root path
    if (href === '/' && location.pathname === '/') return true;
    
    // Prefix match for non-root paths with proper path boundary checking
    if (href !== '/' && href !== '#') {
      // Check if location pathname starts with href AND
      // either ends with href or continues with a slash
      // This prevents "/data" from matching "/data-management"
      const isPrefix = location.pathname.startsWith(href);
      const isBoundaryCorrect = 
        location.pathname.length === href.length || 
        location.pathname.charAt(href.length) === '/';
      
      return isPrefix && isBoundaryCorrect;
    }
    
    return false;
  };

  return (
    <div className="space-y-1">
      {visibleCategories.map((category) => {
        const categoryName = category.name || category.label || '';
        
        return (
          <div key={categoryName} className="mb-4">
            {/* Category Header */}
            <div className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-blue-200 hover:text-blue-100 rounded-md">
              <span>{category.label || category.name}</span>
            </div>
            
            {/* Category Items - Always visible */}
            <div className="mt-1 ml-2 pl-2 border-l border-indigo-800">
              {category.items.map((item) => {
                const Icon = item.icon;
                const href = item.href || item.path || '#';
                
                // Use the improved active route detection
                const isActive = isRouteActive(href);
                console.log(`Checking item ${item.label} (${href}): ${isActive ? 'ACTIVE' : 'inactive'}`);
                
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
                    className={({ isActive: routeActive }) => {
                      // Use either our custom detection or React Router's
                      const active = isActive || routeActive;
                      console.log(`NavLink for ${item.label}: ${active ? 'ACTIVE' : 'inactive'}`);
                      return cn(
                        "flex items-center px-3 py-2 text-sm rounded-md my-1",
                        active
                          ? "bg-gradient-to-r from-blue-800 to-indigo-700 text-white font-medium"
                          : "text-blue-200 hover:text-white hover:bg-indigo-900/50"
                      );
                    }}
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
} 

interface SidebarNavigationProps {
  categories: NavCategory[];
  userRole?: string;
}
