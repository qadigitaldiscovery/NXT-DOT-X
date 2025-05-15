
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import DashboardModules from '@/components/master-dash/DashboardModules';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { 
  Layout, 
  Key, 
  Users, 
  Settings, 
  FileText, 
  CreditCard,
  Database,
  Shield,
  Globe,
  BarChart3,
  Building,
  UserCog,
  ClipboardList,
  Home,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { NavCategory } from '@/components/layout/sidebar/types';

const MasterDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { preferences, loading: prefsLoading, error } = useUserPreferences({
    module: 'dashboard',
    key: 'layout_state',
    defaultValue: { sidebar: "expanded", theme: "dark" }
  });

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  // Define navigation categories for the sidebar
  const navCategories: NavCategory[] = [
    {
      name: "Main",
      items: [
        { label: "All Modules", href: "/", icon: Layout },
        { label: "API Keys", href: "/tech-hub/api-management", icon: Key },
        { label: "Project Management", href: "/projects", icon: ClipboardList },
        { label: "RAG Dashboard", href: "/dashboard/rag", icon: AlertTriangle }
      ]
    },
    {
      name: "Administration",
      items: [
        { label: "User Management", href: "/admin/users", icon: Users },
        { label: "Customer Management", href: "/data-management/customers", icon: Building },
        { label: "Roles & Permissions", href: "/admin/roles", icon: UserCog },
        { label: "Security", href: "/admin/security", icon: Shield },
        { label: "Reporting", href: "/admin/reporting", icon: BarChart3 },
        { label: "Localization", href: "/admin/localization", icon: Globe },
        { label: "Documentation", href: "/admin/documentation", icon: FileText },
        { label: "Database Admin", href: "/admin/database", icon: Database },
        { label: "System Settings", href: "/admin/system-settings", icon: Settings }
      ]
    },
    {
      name: "Account",
      items: [
        { label: "Billing", href: "/settings/billing", icon: CreditCard }
      ]
    }
  ];

  // Custom footer with navigation controls
  const navigationFooter = (
    <div className="flex items-center justify-between p-2 border-t border-gray-700/50 mt-auto bg-indigo-950">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-gray-300 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-gray-300 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-gray-300 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  // If there's an error loading preferences, show fallback
  if (error) {
    return (
      <SharedDashboardLayout
        moduleTitle="Business Management Platform"
        navCategories={navCategories}
        customFooterContent={navigationFooter}
        showTopLeftToggle={true}
        removeBottomToggle={false}
      >
        <DashboardModules />
      </SharedDashboardLayout>
    );
  }

  // If preferences are loading, render a more stable loading state
  if (prefsLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard preferences...</p>
        </div>
      </div>
    );
  }

  // Safely access preferences with proper type handling and fallbacks
  const prefsObject = typeof preferences === 'object' && preferences ? preferences : {};
  const sidebarState = prefsObject.sidebar || "expanded";

  return (
    <SharedDashboardLayout
      moduleTitle="Business Management Platform"
      navCategories={navCategories}
      customFooterContent={navigationFooter}
      showTopLeftToggle={sidebarState !== "collapsed"}
      removeBottomToggle={false}
    >
      <DashboardModules />
    </SharedDashboardLayout>
  );
};

export default MasterDash;
