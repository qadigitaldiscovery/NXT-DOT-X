
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import DashboardModules from '@/components/master-dash/DashboardModules';

const MasterDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            NXT-DOT-X Business Platform
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Business Management Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select a module to get started
          </p>
        </div>
        
        <DashboardModules />
      </main>
    </div>
  );
};

export default MasterDash;
