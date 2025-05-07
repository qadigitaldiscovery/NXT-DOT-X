
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileUp, BarChart3, Gift, ArrowDownUp, LogOut, Database, Settings, FileCode, BookOpen, Link as LinkIcon, Image, Video, Users, Shield, Laptop, Calendar, Mail, Search } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useAuth } from '@/context/AuthContext';

const PrototypeSelector = () => {
  const navigate = useNavigate();
  const { logout, user, hasPermission } = useAuth();

  // Check if user is authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // Primary module prototypes data
  const primaryModules = [{
    id: "data-management",
    name: "Data Management",
    description: "Dashboard with supplier costing and analysis",
    path: "/data-management",
    icon: <BarChart3 className="h-16 w-16 text-white" />,
    bgColor: "from-blue-500 to-blue-700",
    permission: "modules.data"
  }, {
    id: "loyalty-rewards",
    name: "Loyalty Rewards",
    description: "Loyalty program management platform",
    path: "/loyalty-rewards",
    icon: <Gift className="h-16 w-16 text-white" />,
    bgColor: "from-purple-500 to-purple-700",
    permission: "modules.loyalty"
  }, {
    id: "trading-system",
    name: "Trading System",
    description: "Inventory and order management",
    path: "/trading-system",
    icon: <ArrowDownUp className="h-16 w-16 text-white" />,
    bgColor: "from-green-500 to-green-700",
    permission: "modules.trading"
  }];

  // Filter modules based on user permissions
  const accessibleModules = primaryModules.filter(module => 
    hasPermission('modules.all') || hasPermission(module.permission)
  );

  // System functions data
  const systemFunctions = [{
    id: "users",
    name: "User Management",
    icon: <Users className="h-5 w-5" />,
    path: "/admin/users",
    permission: "users.view"
  }, {
    id: "security",
    name: "Security",
    icon: <Shield className="h-5 w-5" />,
    path: "/admin/security",
    permission: "settings.access"
  }, {
    id: "database",
    name: "Database",
    icon: <Database className="h-5 w-5" />,
    path: "/admin/database",
    permission: "settings.access"
  }, {
    id: "settings",
    name: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/admin/settings",
    permission: "settings.access"
  }, {
    id: "api",
    name: "API",
    icon: <FileCode className="h-5 w-5" />,
    path: "/admin/api",
    permission: "settings.access"
  }, {
    id: "docs",
    name: "Documentation",
    icon: <BookOpen className="h-5 w-5" />,
    path: "/admin/docs",
    permission: "settings.access"
  }, {
    id: "integrations",
    name: "Integrations",
    icon: <LinkIcon className="h-5 w-5" />,
    path: "/admin/integrations",
    permission: "settings.access"
  }, {
    id: "media",
    name: "Media",
    icon: <Image className="h-5 w-5" />,
    path: "/admin/media",
    permission: "settings.access"
  }, {
    id: "reports",
    name: "Reports",
    icon: <FileUp className="h-5 w-5" />,
    path: "/admin/reports",
    permission: "settings.access"
  }, {
    id: "calendar",
    name: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    path: "/admin/calendar",
    permission: "settings.access"
  }, {
    id: "notifications",
    name: "Notifications",
    icon: <Mail className="h-5 w-5" />,
    path: "/admin/notifications",
    permission: "settings.access"
  }, {
    id: "search",
    name: "Search",
    icon: <Search className="h-5 w-5" />,
    path: "/admin/search",
    permission: "settings.access"
  }];

  // Filter system functions based on user permissions
  const accessibleSystemFunctions = systemFunctions.filter(func => 
    hasPermission('modules.all') || hasPermission(func.permission)
  );
  
  const handleModuleClick = (moduleId: string, path: string) => {
    console.log(`Selected module: ${moduleId}`);
    navigate(path, {
      replace: true
    });
    setTimeout(() => {
      toast.success(`Welcome to ${moduleId} dashboard`);
    }, 500);
  };
  
  const handleSystemClick = (systemId: string, path: string) => {
    if (systemId === "users") {
      navigate("/admin/users");
    } else {
      toast.info(`System function ${systemId} is not implemented yet`);
    }
  };
  
  return <div className="flex flex-col min-h-screen bg-zinc-100">
      <header className="text-white shadow-sm bg-slate-700">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold">DOT-X  |  BUSINESS MANAGEMENT PLATFORM</span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm">
                Logged in as: <span className="font-semibold">{user.username}</span>
                <span className="ml-2 px-2 py-1 bg-slate-600 rounded-full text-xs">{user.role}</span>
              </div>
            )}
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-[#a51919]">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">PRIMARY MODULES</h1>
        <p className="text-gray-600 mb-6">Select one of our core business modules to get started</p>
        
        {/* Primary Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {accessibleModules.map(module => <Card key={module.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md hover:scale-105">
              
              <CardHeader className="pb-2">
                <CardTitle className="font-bold text-2xl text-center">{module.name.toUpperCase()}</CardTitle>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 pb-6">
                <Button className="w-full bg-[#c01c1c] hover:bg-[#a51919] font-medium text-lg py-6" onClick={() => handleModuleClick(module.id, module.path)}>
                  Launch Module
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-800 mt-8">ADMINISTRATION</h2>
        <p className="text-gray-600 mb-6">Access administration and utility features</p>
        
        {/* System Functions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {accessibleSystemFunctions.map(system => <HoverCard key={system.id}>
              <HoverCardTrigger asChild>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border cursor-pointer" 
                      onClick={() => handleSystemClick(system.id, system.path)}>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-3 rounded-full bg-gray-100 mb-3">
                      {system.icon}
                    </div>
                    <p className="text-sm font-medium">{system.name.toUpperCase()}</p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="text-sm">
                  <p className="font-semibold">{system.name}</p>
                  <p className="text-muted-foreground">
                    {system.id === "users" ? "Manage user accounts and permissions" : "System function coming soon"}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>)}
        </div>
      </main>
      
      <footer className="border-t border-border bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-6 mr-3" />
            <span className="text-sm">© 2025 All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>;
};
export default PrototypeSelector;
