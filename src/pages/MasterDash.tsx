
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
  Home
} from 'lucide-react';

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
        { label: "Project Management", path: "/projects", icon: ClipboardList }
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

  return (
    <SharedDashboardLayout
      moduleTitle="Business Management Platform"
      navCategories={navCategories}
      homeItem={{ label: "Home", path: "/", icon: Home }}
    >
      <DashboardModules />
    </SharedDashboardLayout>
  );
};

export default MasterDash;
