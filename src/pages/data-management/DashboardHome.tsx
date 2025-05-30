import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, FileUp, BarChart3, LineChart, FileCog, FileArchive, Users, Truck, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock module data service
const useDashboardModules = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modules, setModules] = useState<any[]>([]);

  const fetchModules = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - in a real app this would come from an API
      const moduleData = [
        { id: 'suppliers', title: 'Supplier Management', icon: Truck, description: 'Manage suppliers, track performance, and optimize procurement processes.', path: '/data-management/suppliers', action: 'Access' },
        { id: 'customers', title: 'Customer Management', icon: Users, description: 'Manage customer relationships, track interactions, and analyze customer data.', path: '/data-management/customers', action: 'Access' },
        { id: 'costing', title: 'Supplier Costing', icon: Database, description: 'Monitor and analyze supplier costs and pricing data.', path: '/data-management/supplier-costing', action: 'Access' },
        { id: 'analysis', title: 'Cost Analysis', icon: BarChart3, description: 'Deep dive into cost structures and optimization opportunities.', path: '/data-management/cost-analysis', action: 'Analyze' },
        { id: 'documents', title: 'Document Repository', icon: FileArchive, description: 'Manage supplier contracts, specifications and other documents.', path: '/data-management/documents', action: 'View Documents' },
        { id: 'competitor', title: 'Competitor Pricing', icon: LineChart, description: 'Track and analyze competitor pricing strategies.', path: '/data-management/pricing/competitor-pricing', action: 'View Pricing' },
        { id: 'prices', title: 'Price Management', icon: FileCog, description: 'Set and manage product pricing and discounts.', path: '/data-management/pricing/price-management', action: 'Manage Prices' },
        { id: 'uploads', title: 'File Uploads', icon: FileUp, description: 'Upload and process supplier cost files.', path: '/data-management/uploads', action: 'Upload Files' },
        { id: 'insights', title: 'Data Insights', icon: BarChart3, description: 'Analyze and visualize your data for better decision making.', path: '/data-management/insights', action: 'View Insights' },
      ];
      
      setModules(moduleData);
    } catch (err) {
      console.error('Error fetching dashboard modules:', err);
      setError('Failed to load dashboard modules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return { modules, isLoading, error, refetch: fetchModules };
};

const DashboardHome = () => {
  const navigate = useNavigate();
  const { modules, isLoading, error, refetch } = useDashboardModules();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle navigation with error handling
  const handleNavigate = (path: string) => {
    try {
      navigate(path);
    } catch (err) {
      console.error('Navigation error:', err);
      toast.error('Failed to navigate to the requested page.');
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
      toast.success('Dashboard refreshed successfully');
    } catch (err) {
      toast.error('Failed to refresh the dashboard');
      console.error('Error refreshing dashboard:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Loading state
  if (isLoading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <header>
          <h1 className="text-3xl font-bold">Data Management Module</h1>
          <p className="text-muted-foreground">Access and manage supplier data, costs, and documents</p>
        </header>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
              <module.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleNavigate(module.path)}
              >
                {module.action} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
