
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { toast } from 'sonner';
import { FileUp, Database, Settings, FileCode, BookOpen, Link as LinkIcon, Image, Video, Users, Shield, Calendar, Mail, Search } from 'lucide-react';

interface SystemFunction {
  id: string;
  name: string;
  icon: React.ReactElement;
  path: string;
  permission: string;
  description: string;
}

const Administration: React.FC = () => {
  const navigate = useNavigate();

  // System functions data
  const systemFunctions = [
    {
      id: "users",
      name: "User Management",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/users",
      permission: "users.view",
      description: "Manage user accounts and permissions"
    }, 
    {
      id: "security",
      name: "Security",
      icon: <Shield className="h-5 w-5" />,
      path: "/admin/security",
      permission: "settings.access",
      description: "System security settings and controls"
    }, 
    {
      id: "database",
      name: "Database",
      icon: <Database className="h-5 w-5" />,
      path: "/admin/database",
      permission: "settings.access",
      description: "Database management and configuration"
    }, 
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
      permission: "settings.access",
      description: "System-wide configuration settings"
    }, 
    {
      id: "api",
      name: "API",
      icon: <FileCode className="h-5 w-5" />,
      path: "/admin/api",
      permission: "settings.access",
      description: "API documentation and management"
    }, 
    {
      id: "docs",
      name: "Documentation",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/admin/documentation",
      permission: "settings.access",
      description: "System documentation and guides"
    }, 
    {
      id: "integrations",
      name: "Integrations",
      icon: <LinkIcon className="h-5 w-5" />,
      path: "/admin/integrations",
      permission: "settings.access",
      description: "Third-party service integrations"
    }, 
    {
      id: "media",
      name: "Media",
      icon: <Image className="h-5 w-5" />,
      path: "/admin/media",
      permission: "settings.access",
      description: "Media library and asset management"
    }, 
    {
      id: "reports",
      name: "Reports",
      icon: <FileUp className="h-5 w-5" />,
      path: "/admin/reports",
      permission: "settings.access",
      description: "Generate and view system reports"
    }, 
    {
      id: "calendar",
      name: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      path: "/admin/calendar",
      permission: "settings.access",
      description: "Calendar and scheduling functions"
    }, 
    {
      id: "notifications",
      name: "Notifications",
      icon: <Mail className="h-5 w-5" />,
      path: "/admin/notifications",
      permission: "settings.access",
      description: "System notification settings"
    }, 
    {
      id: "search",
      name: "Search",
      icon: <Search className="h-5 w-5" />,
      path: "/admin/search",
      permission: "settings.access",
      description: "Advanced search functionality"
    }
  ];

  const handleSystemClick = (systemId: string, path: string) => {
    if (systemId === "users" || systemId === "docs") {
      navigate(path);
    } else {
      toast.info(`System function ${systemId} is not implemented yet`);
    }
  };

  const chunkedFunctions = [];
  for (let i = 0; i < systemFunctions.length; i += 2) {
    chunkedFunctions.push(systemFunctions.slice(i, i + 2));
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2 text-gray-100 text-right">ADMINISTRATION</h2>
      <p className="text-gray-300 mb-6 text-right">Access administration and utility features</p>
      
      {chunkedFunctions.map((chunk, index) => (
        <div key={index} className="mb-4 grid grid-cols-2 gap-4">
          {chunk.map(system => (
            <HoverCard key={system.id}>
              <HoverCardTrigger asChild>
                <Card 
                  className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-lg bg-black/40 border-white/10" 
                  onClick={() => handleSystemClick(system.id, system.path)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-3 rounded-full bg-white/10 mb-3">
                      {React.cloneElement(system.icon, {
                        className: `${system.icon.props.className} text-white`
                      })}
                    </div>
                    <p className="text-sm font-medium text-white">{system.name.toUpperCase()}</p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="backdrop-blur-xl bg-black/80 border-slate-700 text-white">
                <div className="text-sm">
                  <p className="font-semibold">{system.name}</p>
                  <p className="text-slate-300">{system.description}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Administration;
