
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileUp, BarChart3, Gift, ArrowDownUp, LogOut } from 'lucide-react';

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
  const prototypes = [{
    id: "beta1",
    name: "Data Management",
    description: "Dashboard with supplier costing and analysis",
    path: "/beta1",
    icon: <BarChart3 className="h-12 w-12 text-white" />
  }, {
    id: "beta2",
    name: "Loyalty Program",
    description: "Loyalty program management platform",
    path: "/beta2",
    icon: <Gift className="h-12 w-12 text-white" />
  }, {
    id: "beta3",
    name: "Future Module",
    description: "Module in development",
    path: "/beta3",
    icon: <ArrowDownUp className="h-12 w-12 text-white" />
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
  
  return <div className="min-h-screen bg-white">
      <header className="bg-[#c01c1c] text-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" 
              alt="NXT LEVEL TECH" 
              className="h-8 mr-3" 
            />
            <span className="text-xl font-bold">MANAGEMENT PLATFORM</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-[#a51919]">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Platform Modules</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prototypes.map(prototype => <Card key={prototype.id} className="overflow-hidden transition-all hover:shadow-md border-0 shadow">
              <CardHeader className="pb-2">
                <CardTitle>{prototype.name}</CardTitle>
                <CardDescription>{prototype.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="p-4 rounded-full bg-[#c01c1c]">
                  {prototype.icon}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#c01c1c] hover:bg-[#a51919]" onClick={() => handlePrototypeClick(prototype.id, prototype.path)}>
                  Launch Module
                </Button>
              </CardFooter>
            </Card>)}
        </div>
      </main>
      
      <footer className="border-t border-border bg-gray-900 text-white mt-auto py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f39ef88d-7664-4c92-8f4a-44368177dfde.png" 
              alt="NXT LEVEL TECH" 
              className="h-6 mr-3" 
            />
            <span className="text-sm">© 2025 All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>;
};

export default PrototypeSelector;
