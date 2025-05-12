
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

  // Define navigation categories for the sidebar
  const navCategories = [
    {
      name: "Main",
      items: [
        { label: "All Modules", path: "/", icon: Layout },
        { label: "API Keys", path: "/tech-hub/api-management", icon: Key },
        { label: "Project Management", path: "/projects", icon: ClipboardList },
        { label: "RAG Dashboard", path: "/dashboard/rag", icon: AlertTriangle }
      ]
    },
    {
      name: "Administration",
      items: [
        { label: "User Management", path: "/admin/users", icon: Users },
        { label: "Customer Management", path: "/data-management/customers", icon: Building },
        { label: "Roles & Permissions", path: "/admin/roles", icon: UserCog },
        { label: "Security", path: "/admin/security", icon: Shield },
        { label: "Reporting", path: "/admin/reporting", icon: BarChart3 },
        { label: "Localization", path: "/admin/localization", icon: Globe },
        { label: "Documentation", path: "/admin/documentation", icon: FileText },
        { label: "Database Admin", path: "/admin/database", icon: Database },
        { label: "System Settings", path: "/admin/system-settings", icon: Settings }
      ]
    },
    {
      name: "Account",
      items: [
        { label: "Billing", path: "/settings/billing", icon: CreditCard }
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
};

export default MasterDash;
