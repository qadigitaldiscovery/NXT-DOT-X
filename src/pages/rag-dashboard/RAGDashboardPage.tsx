
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import OverviewStats from '@/components/rag-dashboard/OverviewStats';
import AlertsList from '@/components/rag-dashboard/AlertsList';
import ThresholdRulesList from '@/components/rag-dashboard/ThresholdRulesList';
import { useModules } from '@/hooks/useModules';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const RAGDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserPermissions();
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { 
    modules,
    loading: modulesLoading, 
    error: modulesError,
    refreshModules,
    updateModuleStatus
  } = useModules();

  const { 
    alerts, 
    loading: alertsLoading, 
    error: alertsError,
    resolveAlert 
  } = useAlerts();

  const {
    rules,
    loading: rulesLoading,
    error: rulesError,
    addRule,
    deleteRule
  } = useThresholdRules();

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user) {
          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', authUser.user.id)
            .eq('module', 'rag_dashboard')
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user preferences:', error);
          }
          
          setUserPreferences(data || { sidebar: "expanded", theme: "dark" });
        }
      } catch (err) {
        console.error('Error checking user state:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, []);

  // Save user preferences
  const saveUserPreferences = async (preferences: any) => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      if (authUser?.user) {
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: authUser.user.id,
            module: 'rag_dashboard',
            key: 'layout_state',
            value: preferences
          });

        if (error) {
          throw error;
        }
        
        setUserPreferences(preferences);
      }
    } catch (err) {
      console.error('Error saving preferences:', err);
      toast({
        title: 'Error',
        description: 'Failed to save your preferences',
        variant: 'destructive'
      });
    }
  };

  if (loading || modulesLoading || alertsLoading || rulesLoading) {
    return (
      <PlatformLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </PlatformLayout>
    );
  }

  if (modulesError || alertsError || rulesError) {
    return (
      <PlatformLayout>
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              There was an error loading the dashboard data. Please try again later.
            </p>
            <button 
              onClick={() => navigate(0)} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh
            </button>
          </CardContent>
        </Card>
      </PlatformLayout>
    );
  }

  const handleAlertResolve = (id: string) => {
    resolveAlert(id);
  };

  const handleDeleteRule = (id: string) => {
    deleteRule(id);
  };

  return (
    <PlatformLayout>
      <DashboardProvider
        refreshModules={refreshModules}
        resolveAlert={resolveAlert}
        addRule={addRule}
        deleteRule={deleteRule}
      >
        <div className="space-y-6 p-6">
          <OverviewStats
            modules={modules}
            alerts={alerts}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RAGDashboardGrid 
                className=""
              />
            </div>
            
            <div className="space-y-6">
              <AlertsList 
                alerts={alerts}
                onResolve={handleAlertResolve}
              />
              
              {hasPermission('modules.configure') && (
                <ThresholdRulesList 
                  rules={rules}
                  onDeleteRule={handleDeleteRule}
                />
              )}
            </div>
          </div>
        </div>
      </DashboardProvider>
    </PlatformLayout>
  );
};

export default RAGDashboardPage;
