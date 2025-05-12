
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Search, 
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
  ClipboardList
} from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardModules from '@/components/master-dash/DashboardModules';

const MasterDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  // Navigation handler for sidebar items
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#10121b]">
      {/* Main Layout */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="h-full bg-[#15171f] w-64 p-4 flex flex-col">
          <div className="py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">All Modules</h2>
          </div>
          
          <nav className="flex-1 mt-4 space-y-1">
            <SidebarItem 
              icon={<Layout className="w-5 h-5" />} 
              label="All Modules" 
              active 
              onClick={() => handleNavigation('/')}
            />
            <SidebarItem 
              icon={<Key className="w-5 h-5" />} 
              label="API Keys" 
              onClick={() => handleNavigation('/tech-hub/api-management')}
            />
            <SidebarItem 
              icon={<ClipboardList className="w-5 h-5" />} 
              label="Project Management" 
              onClick={() => handleNavigation('/projects')}
            />
            
            {/* Administration Section */}
            <div className="py-2 mt-4">
              <h3 className="px-2 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Administration</h3>
              <SidebarItem 
                icon={<Users className="w-5 h-5" />} 
                label="User Management" 
                onClick={() => handleNavigation('/admin/users')}
              />
              <SidebarItem 
                icon={<Building className="w-5 h-5" />} 
                label="Customer Management" 
                onClick={() => handleNavigation('/data-management/customers')}
              />
              <SidebarItem 
                icon={<UserCog className="w-5 h-5" />} 
                label="Roles & Permissions" 
                onClick={() => handleNavigation('/admin/roles')}
              />
              <SidebarItem 
                icon={<Shield className="w-5 h-5" />} 
                label="Security" 
                onClick={() => handleNavigation('/admin/security')}
              />
              <SidebarItem 
                icon={<BarChart3 className="w-5 h-5" />} 
                label="Reporting" 
                onClick={() => handleNavigation('/admin/reporting')}
              />
              <SidebarItem 
                icon={<Globe className="w-5 h-5" />} 
                label="Localization" 
                onClick={() => handleNavigation('/admin/localization')}
              />
              <SidebarItem 
                icon={<FileText className="w-5 h-5" />} 
                label="Documentation" 
                onClick={() => handleNavigation('/admin/documentation')}
              />
              <SidebarItem 
                icon={<Database className="w-5 h-5" />} 
                label="Database Admin" 
                onClick={() => handleNavigation('/admin/database')}
              />
              <SidebarItem 
                icon={<Settings className="w-5 h-5" />} 
                label="System Settings" 
                onClick={() => handleNavigation('/admin/system-settings')}
              />
            </div>
            
            {/* Other sections */}
            <div className="py-2 mt-4">
              <h3 className="px-2 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Account</h3>
              <SidebarItem 
                icon={<CreditCard className="w-5 h-5" />} 
                label="Billing" 
                onClick={() => handleNavigation('/settings/billing')}
              />
            </div>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-slate-800">
            <h1 className="text-xl font-semibold text-white">Business</h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="p-2 text-slate-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 15a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" />
                    <path d="M4 10h6" />
                    <path d="M14 10h6" />
                    <path d="M9 15v5" />
                    <path d="M15 15v5" />
                    <path d="M12 10V3" />
                    <path d="M6 7l6-4 6 4" />
                  </svg>
                </button>
                <button className="p-2 text-slate-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                    <path d="m9 10 2 2 4-4" />
                  </svg>
                </button>
                <button className="p-2 text-slate-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m17 8-5-5-5 5" />
                    <path d="M12 3v12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="p-2 bg-[#1e2231] rounded-md text-white">
                  Administrator
                </div>
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-md">
                  <span className="text-white font-bold">+</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            <DashboardModules />
          </main>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, active = false, onClick }) => {
  return (
    <div 
      className={`flex items-center p-2 rounded-md ${active ? 'bg-blue-500/10' : 'hover:bg-slate-800'} cursor-pointer`}
      onClick={onClick}
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded-md ${active ? 'text-blue-400' : 'text-slate-400'}`}>
        {icon}
      </div>
      <span className={`ml-3 ${active ? 'text-white' : 'text-slate-300'}`}>{label}</span>
      <div className="ml-auto">
        {active && (
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default MasterDash;
