import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  Home, 
  Users, 
  Settings, 
  Database, 
  FileText, 
  Shield, 
  BarChart,
  Globe,
  Layout
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { href: '/master', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
  { href: '/dashboard/rag', label: 'RAG Dashboard', icon: <Layout className="h-5 w-5" /> },
  { href: '/prototypes', label: 'Prototypes', icon: <Layout className="h-5 w-5" /> },
];

const adminNavItems: NavItem[] = [
  { href: '/admin/users', label: 'User Management', icon: <Users className="h-5 w-5" /> },
  { href: '/admin/module-access', label: 'Module Access', icon: <Shield className="h-5 w-5" /> },
  { href: '/admin/database', label: 'Database Admin', icon: <Database className="h-5 w-5" /> },
  { href: '/admin/documentation', label: 'Documentation', icon: <FileText className="h-5 w-5" /> },
  { href: '/admin/reporting', label: 'Reporting', icon: <BarChart className="h-5 w-5" /> },
  { href: '/admin/localization', label: 'Localization', icon: <Globe className="h-5 w-5" /> },
];

const settingsNavItems: NavItem[] = [
  { href: '/settings/billing', label: 'Billing', icon: <Settings className="h-5 w-5" /> },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const NavLink = ({ href, label, icon }: NavItem) => {
    const isActive = location.pathname === href;
    
    return (
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
          "hover:bg-gray-100",
          isActive && "bg-gray-100 text-gray-900"
        )}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  const NavSection = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-1">
        {items.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <NavSection title="Main" items={mainNavItems} />
        <NavSection title="Admin" items={adminNavItems} />
        <NavSection title="Settings" items={settingsNavItems} />
      </div>
    </div>
  );
}
