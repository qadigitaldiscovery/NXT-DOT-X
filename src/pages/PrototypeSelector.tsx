
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileUp, BarChart3, Gift, ArrowDownUp, LogOut, Database, Settings, FileCode, BookOpen, Link, Image, Video } from 'lucide-react';

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

  // Prototype data
  const prototypes = [
    {
      id: "beta1",
      name: "Data Management",
      description: "Dashboard with supplier costing and analysis",
      path: "/beta1",
      icon: <BarChart3 className="h-12 w-12 text-white" />,
      bgColor: "from-blue-600 to-blue-800"
    }, 
    {
      id: "beta2",
      name: "Loyalty Program",
      description: "Loyalty program management platform",
      path: "/beta2",
      icon: <Gift className="h-12 w-12 text-white" />,
      bgColor: "from-purple-600 to-purple-800"
    }, 
    {
      id: "beta3",
      name: "Future Module",
      description: "Module in development",
      path: "/beta3",
      icon: <ArrowDownUp className="h-12 w-12 text-white" />,
      bgColor: "from-green-600 to-green-800"
    },
    {
      id: "beta4",
      name: "Database Manager",
      description: "Manage your data and records",
      path: "/beta4",
      icon: <Database className="h-12 w-12 text-white" />,
      bgColor: "from-red-600 to-red-800"
    },
    {
      id: "beta5",
      name: "Settings Portal",
      description: "Configure system preferences",
      path: "/beta5",
      icon: <Settings className="h-12 w-12 text-white" />,
      bgColor: "from-amber-600 to-amber-800"
    },
    {
      id: "beta6",
      name: "Code Repository",
      description: "Manage your source code",
      path: "/beta6",
      icon: <FileCode className="h-12 w-12 text-white" />,
      bgColor: "from-cyan-600 to-cyan-800"
    },
    {
      id: "beta7",
      name: "Documentation",
      description: "View and manage documentation",
      path: "/beta7",
      icon: <BookOpen className="h-12 w-12 text-white" />,
      bgColor: "from-indigo-600 to-indigo-800"
    },
    {
      id: "beta8",
      name: "Link Management",
      description: "Track and manage external links",
      path: "/beta8",
      icon: <Link className="h-12 w-12 text-white" />,
      bgColor: "from-pink-600 to-pink-800"
    },
    {
      id: "beta9",
      name: "Media Library",
      description: "Manage images and media assets",
      path: "/beta9",
      icon: <Image className="h-12 w-12 text-white" />,
      bgColor: "from-emerald-600 to-emerald-800"
    }
  ];

  const handlePrototypeClick = (prototypeId: string, path: string) => {
    console.log(`Selected module: ${prototypeId}`);
    navigate(path, {
      replace: true
    });
    setTimeout(() => {
      toast.success(`Welcome to ${prototypeId} dashboard`);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="text-white shadow-sm bg-gray-700">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <span className="text-xl font-bold">NXT DOT-X BUSINESS MANAGEMENT PLATFORM</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-[#a51919]">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Platform Modules</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prototypes.map(prototype => (
            <Card 
              key={prototype.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow hover:scale-105"
            >
              <CardHeader className={`bg-gradient-to-br ${prototype.bgColor} pb-2 text-white`}>
                <CardTitle className="text-white">{prototype.name}</CardTitle>
                <CardDescription className="text-white/90">{prototype.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center py-8">
                <div className={`p-5 rounded-full bg-gradient-to-br ${prototype.bgColor} shadow-lg`}>
                  {prototype.icon}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50">
                <Button 
                  className="w-full bg-[#c01c1c] hover:bg-[#a51919] font-medium" 
                  onClick={() => handlePrototypeClick(prototype.id, prototype.path)}
                >
                  Launch Module
                </Button>
              </CardFooter>
            </Card>
          ))}
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
    </div>
  );
};

export default PrototypeSelector;
