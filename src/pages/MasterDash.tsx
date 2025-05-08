
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileUp, BarChart3, Gift, ArrowDownUp, LogOut, Database, Settings, FileCode, BookOpen, Link as LinkIcon, Image, Video, Users, Shield, Laptop, Calendar, Mail, Search, BrainCircuit } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useAuth } from '@/context/AuthContext';

// Assuming this is the correct path based on previous searches
const backgroundImagePath = '/lovable-uploads/backk1.png';

const MasterDash = () => {
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
    name: "Data Management Module",
    description: "Dashboard with supplier costing and analysis",
    path: "/data-management",
    icon: <BarChart3 className="h-16 w-16 text-white" />,
    bgColor: "from-blue-500 to-blue-700",
    permission: "modules.data"
  }, {
    id: "loyalty-rewards",
    name: "Loyalty Rewards Module",
    description: "Loyalty program management platform",
    path: "/loyalty-rewards",
    icon: <Gift className="h-16 w-16 text-white" />,
    bgColor: "from-purple-500 to-purple-700",
    permission: "modules.loyalty"
  }, {
    id: "trading-system",
    name: "Trading System Module",
    description: "Inventory and order management",
    path: "/trading-system",
    icon: <ArrowDownUp className="h-16 w-16 text-white" />,
    bgColor: "from-green-500 to-green-700",
    permission: "modules.trading"
  }, {
    id: "tech-hub",
    name: "Tech Hub Module",
    description: "AI personas and technology resources",
    path: "/tech-hub/personas",
    icon: <BrainCircuit className="h-16 w-16 text-white" />,
    bgColor: "from-amber-500 to-amber-700",
    permission: "modules.tech"
  }];

  // Filter modules based on user permissions - for now, grant access to all
  const accessibleModules = primaryModules;

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

  // Make all system functions accessible for a unified user experience
  const accessibleSystemFunctions = systemFunctions;
  
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
  
  return <div 
    className="min-h-screen flex flex-col relative p-4 sm:p-6 md:p-8" 
    style={{
      backgroundImage: `url(${backgroundImagePath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Overlay to improve readability of content on top of the background */}
    <div className="absolute inset-0 bg-black/50 z-0"></div>
    
    {/* Content needs to be on a higher z-index to appear above the overlay */}
    <div className="relative z-10 flex flex-col flex-grow">
      <header className="text-white shadow-sm bg-slate-700/80 backdrop-blur-sm">
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
        <h1 className="text-3xl font-bold mb-2 text-gray-100">PRIMARY MODULES</h1>
        <p className="text-gray-300 mb-6">Select one of our core business modules to get started</p>
        
        {/* Primary Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {accessibleModules.map(module => (
            <Card 
              key={module.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md hover:scale-105 backdrop-blur-sm bg-black/50 border-white/20"
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-bold text-2xl text-center text-white">{module.name.toUpperCase()}</CardTitle>
                <CardDescription className="text-base text-slate-300">{module.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 pb-6">
                <Button className="w-full bg-[#c01c1c] hover:bg-[#a51919] font-medium text-lg py-6" onClick={() => handleModuleClick(module.id, module.path)}>
                  Launch Module
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-100 mt-8">ADMINISTRATION</h2>
        <p className="text-gray-300 mb-6">Access administration and utility features</p>
        
        {/* System Functions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {accessibleSystemFunctions.map(system => (
            <HoverCard key={system.id}>
              <HoverCardTrigger asChild>
                <Card 
                  className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm bg-black/50 border-white/20"
                  onClick={() => handleSystemClick(system.id, system.path)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="p-3 rounded-full bg-white/10 mb-3">
                      {React.cloneElement(system.icon, { className: `${system.icon.props.className} text-white` })}
                    </div>
                    <p className="text-sm font-medium text-white">{system.name.toUpperCase()}</p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="backdrop-blur-md bg-black/80 border-slate-700 text-white">
                <div className="text-sm">
                  <p className="font-semibold">{system.name}</p>
                  <p className="text-slate-300">
                    {system.id === "users" ? "Manage user accounts and permissions" : "System function coming soon"}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </main>
      
      <footer className="border-t border-border bg-gray-900/80 backdrop-blur-sm text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" alt="NXT LEVEL TECH" className="h-6 mr-3" />
            <span className="text-sm">© 2025 All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  </div>;
};
export default MasterDash;
