
import React from 'react';
import DashboardModules from '../components/master-dash/DashboardModules';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const MasterDash: React.FC = () => {
  console.log("⭐ MasterDash component being rendered");
  const { user } = useAuth() || { user: null };

  if (!user) {
    console.log("⭐ No user, redirecting to landing page");
    return <Navigate to="/landing" replace />;
  }

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

export default MasterDash;
