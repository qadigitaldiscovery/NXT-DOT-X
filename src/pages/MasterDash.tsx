import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import DashboardModules from '../components/master-dash/DashboardModules';
import SharedDashboardLayout from '../components/layout/SharedDashboardLayout';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

/**
 * Removed "All Modules," "Project Management," etc. references to better align 
 * with the new “Secondary Systems Module” sidebar changes.
 */

const MasterDash: React.FC = () => {
  console.log("⭐ MasterDash component being rendered");
  const navigate = useNavigate();
  const { user } = useAuth() || { user: null };

  // Example user preference states (placeholder)
  const [loadingPrefs, setLoadingPrefs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    console.log("⭐ MasterDash useEffect running, user:", user);
    if (!user) {
      console.log("⭐ No user, redirecting to landing page");
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

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

  // Error or loading states for user preferences
  if (error) {
    console.error("❌ Error loading preferences:", error);
    return (
      <SharedDashboardLayout 
        moduleTitle="Business Management Platform" 
        navCategories={[]} 
        customFooterContent={navigationFooter} 
        showTopLeftToggle={true} 
        removeBottomToggle={false} 
      >
        <DashboardModules />
      </SharedDashboardLayout>
    );
  }

  if (loadingPrefs) {
    console.log("⭐ Preferences loading");
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Loading dashboard preferences...</p>
        </div>
      </div>
    );
  }

  console.log("⭐ Rendering MasterDash without the old 'All Modules' & co. to avoid duplication with the 'Secondary Systems Module' sidebar");

  return (
    <SharedDashboardLayout 
      moduleTitle="Business Management Platform" 
      navCategories={[]} 
      customFooterContent={navigationFooter} 
      showTopLeftToggle={true} 
      removeBottomToggle={false} 
      sidebarClassName="bg-gray-900"
    >
      <DashboardModules />
    </SharedDashboardLayout>
  );
};

export default MasterDash;
