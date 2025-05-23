
import React from 'react';
import DashboardModules from '@/components/master-dash/DashboardModules';

const MasterDash = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Business Management Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select a module to get started (Security Disabled)
          </p>
        </div>
        
        <DashboardModules />
      </main>
    </div>
  );
};

export default MasterDash;
