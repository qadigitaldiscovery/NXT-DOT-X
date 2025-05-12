
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ChevronLeft, ChevronRight, Layers, Settings, Users } from "lucide-react";
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';

const Index = () => {
  const navigate = useNavigate();
  
  // Define navigation categories for this page
  const navCategories = [
    {
      name: "Main Navigation",
      items: [
        { label: "Dashboard", path: "/", icon: Home },
        { label: "Projects", path: "/projects", icon: Layers },
        { label: "Users", path: "/admin/users", icon: Users },
        { label: "Settings", path: "/settings", icon: Settings }
      ]
    }
  ];

  // Custom navigation footer with back, home, and forward buttons
  const navigationFooter = (
    <div className="flex items-center justify-between p-2 border-t border-indigo-900/50 mt-auto bg-indigo-950">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <SharedDashboardLayout
      moduleTitle="Welcome"
      navCategories={navCategories}
      customFooterContent={navigationFooter}
      removeBottomToggle={false}
      showTopLeftToggle={true}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Business Management Platform</CardTitle>
            <CardDescription>Your all-in-one business management solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Welcome to your centralized business management platform. Navigate through the various modules using the sidebar.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/master')}>Go to Dashboard</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Management</CardTitle>
            <CardDescription>Manage your projects efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access your projects, tasks, and team coordination tools through the Project Management module.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/projects')}>View Projects</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Brand Marketing</CardTitle>
            <CardDescription>Monitor and manage your brand</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Analyze brand performance, monitor market perception, and manage SEO through the Brand Marketing module.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/brand-marketing')}>View Brand Analytics</Button>
          </CardFooter>
        </Card>
      </div>
    </SharedDashboardLayout>
  );
};

export default Index;
