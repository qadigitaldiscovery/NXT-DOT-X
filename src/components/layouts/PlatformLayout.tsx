
import React from 'react';

interface PlatformLayoutProps {
  children: React.ReactNode;
  moduleTitle: string;
  useGlobalNavigation?: boolean;
  navCategories?: any[];
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="w-full p-4">
        {children}
      </main>
    </div>
  );
};

export { PlatformLayout };
