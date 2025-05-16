import React, { memo } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/user-menu';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navCategories } from '../layout/sidebar/NavigationConfig';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopbarProps {
  moduleTitle?: string;
}

// Use memo to prevent unnecessary re-renders
const Topbar: React.FC<TopbarProps> = memo(({ moduleTitle = '' }) => {
  // Get top-level navigation items from all categories
  const mainNavLinks = navCategories.map(category => ({
    name: category.label,
    href: `/${category.label.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-100 dark:border-gray-700">
      <div className="px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-blue-600 dark:text-blue-400">
            {moduleTitle}
          </h1>
        </div>
        
        {/* Main Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          {mainNavLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                "px-2 py-1 rounded text-sm font-medium",
                isActive 
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300"
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-gray-500" />
          </Button>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
});

// Add display name for debugging
Topbar.displayName = 'Topbar';

export default Topbar;
