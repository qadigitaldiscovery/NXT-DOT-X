
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import DashboardModules from '../components/master-dash/DashboardModules';
import MasterDashSidebar from '../components/master-dash/MasterDashSidebar';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

const MasterDash: React.FC = () => {
  console.log("⭐ MasterDash component being rendered");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth() || { user: null };
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    console.log("⭐ MasterDash useEffect running, user:", user);
    if (!user) {
      console.log("⭐ No user, redirecting to landing page");
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigation footer with basic forward/back/home
  const navigationFooter = (
    <div className="flex items-center justify-between p-2 border-t border-gray-700/50 mt-auto bg-gray-900">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/master')}
        className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
      >
        <Home className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(1)}
        className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <MasterDashSidebar 
        activePath={location.pathname} 
        open={sidebarOpen}
        onToggle={toggleSidebar}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Business Management Platform</h1>
          <DashboardModules />
        </div>
        {navigationFooter}
      </div>
    </div>
  );
};

export default MasterDash;
