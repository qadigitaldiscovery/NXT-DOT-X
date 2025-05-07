import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileUp, BarChart3, Gift, ArrowDownUp, LogOut, Database, Settings, FileCode, BookOpen, Link as LinkIcon, Image, Video, Users, Shield, Laptop, Calendar, Mail, Search } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
const PrototypeSelector = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    navigate('/landing');
  };

  // Primary module prototypes data
  const primaryModules = [{
    id: "beta1",
    name: "Data Management",
    description: "Dashboard with supplier costing and analysis",
    path: "/beta1",
    icon: <BarChart3 className="h-16 w-16 text-white" />,
    bgColor: "from-blue-500 to-blue-700"
  }, {
    id: "beta2",
    name: "Loyalty Program",
    description: "Loyalty program management platform",
    path: "/beta2",
    icon: <Gift className="h-16 w-16 text-white" />,
    bgColor: "from-purple-500 to-purple-700"
  }, {
    id: "beta3",
    name: "Trading System",
    description: "Inventory and order management",
    path: "/beta3",
    icon: <ArrowDownUp className="h-16 w-16 text-white" />,
    bgColor: "from-green-500 to-green-700"
  }];

  // System functions data
  const systemFunctions = [{
    id: "system1",
    name: "User Management",
    icon: <Users className="h-5 w-5" />,
    path: "/users"
  }, {
    id: "system2",
    name: "Security",
    icon: <Shield className="h-5 w-5" />,
    path: "/security"
  }, {
    id: "system3",
    name: "Database",
    icon: <Database className="h-5 w-5" />,
    path: "/database"
  }, {
    id: "system4",
    name: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings"
  }, {
    id: "system5",
    name: "API",
    icon: <FileCode className="h-5 w-5" />,
    path: "/api"
  }, {
    id: "system6",
    name: "Documentation",
    icon: <BookOpen className="h-5 w-5" />,
    path: "/docs"
  }, {
    id: "system7",
    name: "Integrations",
    icon: <LinkIcon className="h-5 w-5" />,
    path: "/integrations"
  }, {
    id: "system8",
    name: "Media",
    icon: <Image className="h-5 w-5" />,
    path: "/media"
  }, {
    id: "system9",
    name: "Reports",
    icon: <FileUp className="h-5 w-5" />,
    path: "/reports"
  }, {
    id: "system10",
    name: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    path: "/calendar"
  }, {
    id: "system11",
    name: "Notifications",
    icon: <Mail className="h-5 w-5" />,
    path: "/notifications"
  }, {
    id: "system12",
    name: "Search",
    icon: <Search className="h-5 w-5" />,
    path: "/search"
  }];
  const handlePrototypeClick = (prototypeId: string, path: string) => {
    console.log(`Selected module: ${prototypeId}`);
    navigate(path, {
      replace: true
    });
    setTimeout(() => {
      toast.success(`Welcome to ${prototypeId} dashboard`);
    }, 500);
  };
  const handleSystemClick = (systemId: string) => {
    toast.info(`System function ${systemId} is not implemented yet`);
  };
  return <div className="flex flex-col min-h-screen bg-zinc-100">
      <header className="text-white shadow-sm bg-zinc-950">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold">DOT-X  |  BUSINESS MANAGEMENT PLATFORM</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-[#a51919]">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Primary Modules</h1>
        <p className="text-gray-600 mb-6">Select one of our core business modules to get started</p>
        
        {/* Primary Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {primaryModules.map(module => <Card key={module.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md hover:scale-105">
              <div className="">
                <div className="p-5 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  {module.icon}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{module.name}</CardTitle>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 pb-6">
                <Button className="w-full bg-[#c01c1c] hover:bg-[#a51919] font-medium text-lg py-6" onClick={() => handlePrototypeClick(module.id, module.path)}>
                  Launch Module
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-800 mt-8">System Functions</h2>
        <p className="text-gray-600 mb-6">Access administration and utility features</p>
        
        {/* System Functions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {systemFunctions.map(system => <HoverCard key={system.id}>
              <HoverCardTrigger asChild>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border cursor-pointer" onClick={() => handleSystemClick(system.id)}>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-3 rounded-full bg-gray-100 mb-3">
                      {system.icon}
                    </div>
                    <p className="text-sm font-medium">{system.name}</p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="text-sm">
                  <p className="font-semibold">{system.name}</p>
                  <p className="text-muted-foreground">System function coming soon</p>
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