
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Module } from '@/hooks/useModules';

interface DashboardContextType {
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
  handleRefresh: () => Promise<void>;
  refreshModules: () => Promise<{ success: boolean }>;
  handleResolveAlert: (id: string) => Promise<any>;
  handleAddRule: (rule: any) => Promise<any>;
  handleDeleteRule: (id: string) => Promise<any>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: React.ReactNode;
  refreshModules: () => Promise<{ success: boolean }>;
  resolveAlert: (id: string) => Promise<any>;
  addRule: (rule: any) => Promise<any>;
  deleteRule: (id: string) => Promise<any>;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ 
  children, 
  refreshModules,
  resolveAlert,
  addRule,
  deleteRule
}) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshModules();
      toast({
        title: "Dashboard refreshed",
        description: "The dashboard data has been refreshed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "There was an error refreshing the dashboard data.",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshModules, toast]);
  
  const handleResolveAlert = useCallback(async (id: string) => {
    const result = await resolveAlert(id);
    
    if (result.success) {
      toast({
        title: "Alert resolved",
        description: "The alert has been marked as resolved.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to resolve alert",
        description: "There was an error resolving the alert.",
      });
    }
    
    return result;
  }, [resolveAlert, toast]);
  
  const handleAddRule = useCallback(async (rule: any) => {
    try {
      const result = await addRule(rule);
      
      toast({
        title: "Rule created",
        description: "The threshold rule has been created successfully.",
      });
      return result;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to create rule",
        description: "There was an error creating the threshold rule.",
      });
      throw err;
    }
  }, [addRule, toast]);
  
  const handleDeleteRule = useCallback(async (id: string) => {
    const result = await deleteRule(id);
    
    if (result.success) {
      toast({
        title: "Rule deleted",
        description: "The threshold rule has been deleted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete rule",
        description: "There was an error deleting the threshold rule.",
      });
    }
    
    return result;
  }, [deleteRule, toast]);

  return (
    <DashboardContext.Provider 
      value={{ 
        isRefreshing, 
        setIsRefreshing, 
        handleRefresh, 
        refreshModules,
        handleResolveAlert,
        handleAddRule,
        handleDeleteRule
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
