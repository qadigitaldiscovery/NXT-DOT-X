
import React, { memo } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

interface TopbarProps {
  moduleTitle?: string;
}

// Use memo to prevent unnecessary re-renders
const Topbar: React.FC<TopbarProps> = memo(({ moduleTitle = '' }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-100 dark:border-gray-700">
      <div className="px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-blue-600 dark:text-blue-400">
            {moduleTitle}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
});

// Add display name for debugging
Topbar.displayName = 'Topbar';

export default Topbar;
