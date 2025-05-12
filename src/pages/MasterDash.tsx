
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import MasterDashSidebar from '@/components/master-dash/MasterDashSidebar';
import MasterDashNavbar from '@/components/master-dash/MasterDashNavbar';
import DashboardModules from '@/components/master-dash/DashboardModules';

const MasterDash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  return (
    <div className="h-screen overflow-hidden bg-[#10121b] dark:bg-[#0a0b10]">
      {/* Main Layout */}
      <div className="flex h-full">
        {/* Sidebar */}
        <MasterDashSidebar activePath={location.pathname} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <MasterDashNavbar user={user} />

          {/* Dashboard Content */}
          <main className="p-6">
            <DashboardModules />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MasterDash;
