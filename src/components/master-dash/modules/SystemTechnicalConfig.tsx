
import React from 'react';
import { Settings, Shield, Database, Server } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { toast } from 'sonner';

interface ConfigItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  path: string;
  description: string;
}

const SystemTechnicalConfig: React.FC = () => {
  // Technical configuration items with descriptions
  const configItems = [
    { 
      id: "security", 
      name: "Security", 
      icon: <Shield className="h-5 w-5" />, 
      path: "/admin/security",
      description: "Manage system security settings and permissions"
    },
    { 
      id: "api-management", 
      name: "API Management", 
      icon: <Server className="h-5 w-5" />, 
      path: "/tech-hub/api-management",
      description: "Configure and manage API integrations"
    },
    { 
      id: "database", 
      name: "Database", 
      icon: <Database className="h-5 w-5" />, 
      path: "/admin/database",
      description: "Database configuration and management"
    },
    { 
      id: "system-settings", 
      name: "System Settings", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/admin/system-settings",
      description: "Configure core system settings and preferences"
    },
  ];

  const handleConfigClick = (configId: string, path: string) => {
    toast.info(`Navigating to ${configId} configuration`);
    // We would navigate here if the paths were implemented
    // navigate(path);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2 text-gray-100 mt-8">SYSTEM TECHNICAL CONFIGURATION</h2>
      <p className="text-gray-300 mb-6">Manage system security, APIs, databases, and integrations</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {configItems.map(item => (
          <HoverCard key={item.id}>
            <HoverCardTrigger asChild>
              <Card 
                className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm bg-black/50 border-white/20"
                onClick={() => handleConfigClick(item.id, item.path)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-3 rounded-full bg-blue-500/30 mb-3">
                    {React.cloneElement(item.icon, { className: `${item.icon.props.className} text-white` })}
                  </div>
                  <p className="text-sm font-medium text-white">{item.name.toUpperCase()}</p>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="backdrop-blur-md bg-black/80 border-slate-700 text-white">
              <div className="text-sm">
                <p className="font-semibold">{item.name}</p>
                <p className="text-slate-300">{item.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </section>
  );
};

export default SystemTechnicalConfig;
