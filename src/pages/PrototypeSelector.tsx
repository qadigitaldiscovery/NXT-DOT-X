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
    name: "Beta 1",
    description: "Data management dashboard with supplier costing and analysis",
    path: "/beta1",
    icon: <BarChart3 className="h-12 w-12 text-dashboard-primary" />
  }, {
    id: "beta2",
    name: "Beta 2",
    description: "Loyalty program management platform",
    path: "/beta2",
    icon: <Gift className="h-12 w-12 text-green-600" />
  }, {
    id: "beta3",
    name: "Beta 3",
    description: "Future prototype in development",
    path: "/beta3",
    icon: <ArrowDownUp className="h-12 w-12 text-purple-600" />
  }];
  const handlePrototypeClick = (prototypeId: string, path: string) => {
    console.log(`Selected prototype: ${prototypeId}`);
    navigate(path, {
      replace: true
    });
    setTimeout(() => {
      toast.success(`Welcome to ${prototypeId} dashboard`);
    }, 500);
  };
  return <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-dashboard-primary flex items-center justify-center">
              <span className="text-white font-bold">NX</span>
            </div>
            <span className="text-xl font-bold text-dashboard-heading">NXT DOT-X MANAGEMENT SUITE
          </span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-dashboard-heading">Select a Prototype</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prototypes.map(prototype => <Card key={prototype.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle>{prototype.name}</CardTitle>
                <CardDescription>{prototype.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                {prototype.icon}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handlePrototypeClick(prototype.id, prototype.path)}>
                  Launch Prototype
                </Button>
              </CardFooter>
            </Card>)}
        </div>
      </main>
      
      <footer className="border-t border-border bg-white mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          NXT LEVEL TECH Prototype Portal • © 2025 All rights reserved
        </div>
      </footer>
    </div>;
};
export default PrototypeSelector;