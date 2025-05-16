
import React from 'react';

const MasterDashFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-6 mr-3" />
          <span className="text-sm">© 2025 All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default MasterDashFooter;
