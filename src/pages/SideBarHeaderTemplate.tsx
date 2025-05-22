
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SideBarHeaderTemplate: React.FC = () => {
  console.log("⭐ SideBarHeaderTemplate component being rendered");
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
        {/* Content removed as requested */}
      </div>
    </div>
  );
};

export default SideBarHeaderTemplate;
