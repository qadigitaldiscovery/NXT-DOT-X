
import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface TopbarProps {
  moduleTitle?: string;
}

const Topbar: React.FC<TopbarProps> = ({ moduleTitle = '' }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-blue-lightest">
      <div className="px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue to-blue-light">
            {moduleTitle}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
