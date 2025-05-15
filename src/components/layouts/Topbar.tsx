import React from 'react';

interface TopbarProps {
  moduleTitle?: string;
}

const Topbar: React.FC<TopbarProps> = ({ moduleTitle = '' }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {moduleTitle}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          {/* Add any topbar elements here */}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
