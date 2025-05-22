
import React from 'react';
import DashboardModules from '../components/master-dash/DashboardModules';

const TestMasterDash: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome to the Business Management Platform</h1>
      </div>
      
      <div className="grid gap-6">
        <DashboardModules />
      </div>
    </div>
  );
};

export default TestMasterDash;
