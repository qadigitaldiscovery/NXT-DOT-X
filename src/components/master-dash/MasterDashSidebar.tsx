import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  CalendarClock,
  Menu
} from 'lucide-react';
import { Button } from '../ui/button';

// Sidebar Item Component
interface SidebarIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarIconProps> = ({ icon, label, active = false, onClick }) => {
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

interface MasterDashSidebarProps {
  activePath: string;
  open?: boolean;
  onToggle?: () => void;
}

const MasterDashSidebar: React.FC<MasterDashSidebarProps> = ({ activePath, open = true, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if the current location matches a path or starts with it
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Navigation handler for sidebar items with console logging for debugging
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <div 
      className={`h-full transition-all duration-300 ${open ? 'w-64' : 'w-0 md:w-16'} overflow-hidden bg-gray-900`}
    >
      <div className="h-14 flex items-center justify-between border-b border-slate-800 px-4">
        <h2 className={`text-lg font-semibold text-slate-300 ${!open && 'hidden md:hidden'}`}>Business Platform</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 text-slate-300 hover:bg-slate-800 md:flex"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      
      <nav className={`flex-1 p-4 space-y-1 overflow-y-auto ${!open && 'hidden md:block'}`}>
        {/* Administration Section */}
        <div className="py-2 mt-4">
          <h3 className="px-2 text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">Administration</h3>
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="User Management" 
            active={isActive('/admin/users')}
            onClick={() => handleNavigation('/admin/users')}
          />
          <SidebarItem 
            icon={<Building className="w-5 h-5" />} 
            label="Customer Management" 
            active={isActive('/customer-management')}
            onClick={() => handleNavigation('/customer-management/directory')}
          />
          <SidebarItem 
            icon={<UserCog className="w-5 h-5" />} 
            label="Roles & Permissions" 
            active={isActive('/admin/roles')}
            onClick={() => handleNavigation('/admin/roles')}
          />
          <SidebarItem 
            icon={<Shield className="w-5 h-5" />} 
            label="Security" 
            active={isActive('/admin/security')}
            onClick={() => handleNavigation('/admin/security')}
          />
          <SidebarItem 
            icon={<BarChart3 className="w-5 h-5" />} 
            label="Reporting" 
            active={isActive('/admin/reporting')}
            onClick={() => handleNavigation('/admin/reporting')}
          />
          <SidebarItem 
            icon={<Globe className="w-5 h-5" />} 
            label="Localization" 
            active={isActive('/admin/localization')}
            onClick={() => handleNavigation('/admin/localization')}
          />
          <SidebarItem 
            icon={<FileText className="w-5 h-5" />} 
            label="Documentation" 
            active={isActive('/admin/documentation')}
            onClick={() => handleNavigation('/admin/documentation')}
          />
          <SidebarItem 
            icon={<Database className="w-5 h-5" />} 
            label="Database Admin" 
            active={isActive('/admin/database')}
            onClick={() => handleNavigation('/admin/database')}
          />
          <SidebarItem 
            icon={<Settings className="w-5 h-5" />} 
            label="System Settings" 
            active={isActive('/admin/system-settings')}
            onClick={() => handleNavigation('/admin/system-settings')}
          />
        </div>
        
        {/* Other sections */}
        <div className="py-2 mt-4">
          <h3 className="px-2 text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">Account</h3>
          <SidebarItem 
            icon={<CreditCard className="w-5 h-5" />} 
            label="Billing" 
            active={isActive('/settings/billing')}
            onClick={() => handleNavigation('/settings/billing')}
          />
        </div>
      </nav>
      
      {/* Collapsed sidebar with only icons */}
      {!open && (
        <nav className="hidden md:flex flex-col items-center p-2 space-y-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/admin/users')}
            className={`${isActive('/admin/users') ? 'bg-blue-500/10 text-blue-400' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800'}`}
          >
            <Users className="h-5 w-5" />
            <span className="sr-only">User Management</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/customer-management/directory')}
            className={`${isActive('/customer-management') ? 'bg-blue-500/10 text-blue-400' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800'}`}
          >
            <Building className="h-5 w-5" />
            <span className="sr-only">Customer Management</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/settings/billing')}
            className={`${isActive('/settings/billing') ? 'bg-blue-500/10 text-blue-400' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-800'}`}
          >
            <CreditCard className="h-5 w-5" />
            <span className="sr-only">Billing</span>
          </Button>
        </nav>
      )}
    </div>
  );
};

export default MasterDashSidebar;
