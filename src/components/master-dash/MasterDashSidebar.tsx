import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  CalendarClock
} from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';

// Sidebar Item Component
interface SidebarIconProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const SidebarItem = ({ icon, label, active = false, onClick }: SidebarIconProps) => {
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
}

const MasterDashSidebar: React.FC<MasterDashSidebarProps> = ({ activePath }) => {
  const navigate = useNavigate();

  // Navigation handler for sidebar items
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-full bg-[#15171f] dark:bg-[#12141d] w-64 p-4 flex flex-col">
      <div className="py-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">All Modules</h2>
      </div>
      
      <nav className="flex-1 mt-4 space-y-1">
        <SidebarItem 
          icon={<Layout className="w-5 h-5" />} 
          label="All Modules" 
          active={activePath === '/'} 
          onClick={() => handleNavigation('/')}
        />
        <SidebarItem 
          icon={<Key className="w-5 h-5" />} 
          label="API Keys" 
          active={activePath === '/tech-hub/api-management'}
          onClick={() => handleNavigation('/tech-hub/api-management')}
        />
        <SidebarItem 
          icon={<ClipboardList className="w-5 h-5" />} 
          label="Project Management"
          active={activePath === '/projects'} 
          onClick={() => handleNavigation('/projects')}
        />
        <SidebarItem 
          icon={<CalendarClock className="w-5 h-5" />} 
          label="Events"
          active={activePath === '/events'} 
          onClick={() => handleNavigation('/events')}
        />
        
        {/* Administration Section */}
        <div className="py-2 mt-4">
          <h3 className="px-2 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Administration</h3>
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="User Management" 
            active={activePath === '/admin/users'}
            onClick={() => handleNavigation('/admin/users')}
          />
          <SidebarItem 
            icon={<Building className="w-5 h-5" />} 
            label="Customer Management" 
            active={activePath === '/data-management/customers'}
            onClick={() => handleNavigation('/data-management/customers')}
          />
          <SidebarItem 
            icon={<UserCog className="w-5 h-5" />} 
            label="Roles & Permissions" 
            active={activePath === '/admin/roles'}
            onClick={() => handleNavigation('/admin/roles')}
          />
          <SidebarItem 
            icon={<Shield className="w-5 h-5" />} 
            label="Security" 
            active={activePath === '/admin/security'}
            onClick={() => handleNavigation('/admin/security')}
          />
          <SidebarItem 
            icon={<BarChart3 className="w-5 h-5" />} 
            label="Reporting" 
            active={activePath === '/admin/reporting'}
            onClick={() => handleNavigation('/admin/reporting')}
          />
          <SidebarItem 
            icon={<Globe className="w-5 h-5" />} 
            label="Localization" 
            active={activePath === '/admin/localization'}
            onClick={() => handleNavigation('/admin/localization')}
          />
          <SidebarItem 
            icon={<FileText className="w-5 h-5" />} 
            label="Documentation" 
            active={activePath === '/admin/documentation'}
            onClick={() => handleNavigation('/admin/documentation')}
          />
          <SidebarItem 
            icon={<Database className="w-5 h-5" />} 
            label="Database Admin" 
            active={activePath === '/admin/database'}
            onClick={() => handleNavigation('/admin/database')}
          />
          <SidebarItem 
            icon={<Settings className="w-5 h-5" />} 
            label="System Settings" 
            active={activePath === '/admin/system-settings'}
            onClick={() => handleNavigation('/admin/system-settings')}
          />
        </div>
        
        {/* Other sections */}
        <div className="py-2 mt-4">
          <h3 className="px-2 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Account</h3>
          <SidebarItem 
            icon={<CreditCard className="w-5 h-5" />} 
            label="Billing" 
            active={activePath === '/settings/billing'}
            onClick={() => handleNavigation('/settings/billing')}
          />
        </div>
      </nav>
    </div>
  );
};

export default MasterDashSidebar;
