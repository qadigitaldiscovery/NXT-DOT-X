import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ChevronLeft, ChevronRight, Layers, Settings, Users, BarChart3, AlertTriangle } from "lucide-react";
import { NavCategory } from '@/components/layout/sidebar/types';
import { useAuth } from '@/context/AuthContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';

// This component handles the root path and redirects based on authentication status
const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { preferences, setPreferences } = useUserPreferences({
    module: 'home',
    key: 'last_visited',
    defaultValue: { timestamp: new Date().toISOString() }
  });
  
  // Update last visited timestamp
  useEffect(() => {
    if (user) {
      setPreferences({ timestamp: new Date().toISOString() });
    }
  }, [user, setPreferences]);

  useEffect(() => {
    // Wait until auth state is loaded
    if (!loading) {
      if (user) {
        console.log('User authenticated, redirecting to dashboard');
        navigate('/master', { replace: true });
      } else {
        console.log('User not authenticated, redirecting to landing page');
        navigate('/landing', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Define navigation categories for this page
  const categories: NavCategory[] = [
    {
      name: "General",
      label: "General", // Adding the required label property
      items: [
        { label: "Dashboard", href: "/", icon: Home },
        { label: "Projects", href: "/projects", icon: Layers },
        { label: "RAG Dashboard", href: "/dashboard/rag", icon: AlertTriangle },
        { label: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
        { label: "Settings", href: "/settings", icon: Settings, roles: ["admin", "manager"] }
      ]
    }
  ];

  // Custom navigation footer with back, home, and forward buttons
  const navigationFooter = (
    <div className="flex items-center justify-between w-full">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  // Return loading state while determining where to redirect
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="mt-2 text-gray-500">Preparing your experience</p>
      </div>
    </div>
  );
};

export default Index;
