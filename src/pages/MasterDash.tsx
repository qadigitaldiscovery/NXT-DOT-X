import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import DashboardModules from '../components/master-dash/DashboardModules';

const MasterDash: React.FC = () => {
  console.log("⭐ MasterDash component being rendered");
  const navigate = useNavigate();
  const { user } = useAuth() || { user: null };

  // Check if user is authenticated
  useEffect(() => {
    console.log("⭐ MasterDash useEffect running, user:", user);
    if (!user) {
      console.log("⭐ No user, redirecting to landing page");
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  if (!user) {
    return null; // Don't render anything while redirecting
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
