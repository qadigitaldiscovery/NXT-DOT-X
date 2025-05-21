
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Code2,
  Database,
  FileText,
  Globe,
  HelpCircle,
  Menu,
  Settings,
  Layers
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isNew?: boolean;
}

export default function TechHubLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      icon: <Code2 className="h-5 w-5" />,
      label: 'API Management',
      href: '/tech-hub/api-management'
    },
    {
      icon: <Database className="h-5 w-5" />,
      label: 'Database Admin',
      href: '/tech-hub/database'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'Integrations',
      href: '/tech-hub/integrations',
      isNew: true
    },
    {
      icon: <Layers className="h-5 w-5" />,
      label: 'RAG Dashboard',
      href: '/tech-hub/rag-dashboard'
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: 'Documentation',
      href: '/tech-hub/documentation'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'Activity Logs',
      href: '/tech-hub/activity'
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      href: '/tech-hub/settings'
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: 'Support',
      href: '/tech-hub/support'
    }
  ];
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className={cn(
        "border-r bg-muted/40 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex h-14 items-center border-b px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          {sidebarOpen && <h2 className="ml-2 text-lg font-semibold">Tech Hub</h2>}
        </div>
        
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="p-2">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    location.pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "transparent"
                  )}
                >
                  {item.icon}
                  {sidebarOpen && (
                    <div className="flex-1 flex items-center justify-between">
                      {item.label}
                      {item.isNew && (
                        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
