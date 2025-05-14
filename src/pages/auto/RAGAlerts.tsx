
import React, { Suspense } from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
import AlertsList from '@/components/rag-dashboard/AlertsList';
import ThresholdRulesList from '@/components/rag-dashboard/ThresholdRulesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RuleForm from '@/components/rag-dashboard/RuleForm';
import { AlertTriangle, Settings, Bell } from 'lucide-react';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useModules } from '@/hooks/useModules';

const LoadingCard = () => (
  <Card>
    <CardHeader>
      <div className="h-7 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const RAGAlerts = () => {
  const navigate = useNavigate();
  const { preferences, loading: prefsLoading } = useUserPreferences({
    module: 'rag_dashboard',
    key: 'alerts_view',
    defaultValue: { activeTab: 'current' }
  });
  
  const [activeTab, setActiveTab] = React.useState('current');
  const { alerts, loading: alertsLoading, resolveAlert } = useAlerts();
  const { rules, loading: rulesLoading, deleteRule, addRule } = useThresholdRules();
  const { modules } = useModules();
  const [selectedModule, setSelectedModule] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (!prefsLoading && preferences?.activeTab) {
      setActiveTab(preferences.activeTab);
    }
  }, [preferences, prefsLoading]);

  // Handle adding a new rule
  const handleAddRule = async (rule: any) => {
    const result = await addRule(rule);
    if (result.success) {
      setActiveTab('rules');
    }
    return result;
  };

  return (
    <PlatformLayout moduleTitle="RAG Alerts Center" navCategories={ragDashboardNavigation}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
              RAG Alerts Center
            </h1>
            <p className="text-muted-foreground">Manage system alerts and notification rules</p>
          </div>
          
          <div className="flex items-center gap-2">
            {!alertsLoading && alerts && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                {alerts.length} Active {alerts.length === 1 ? 'Alert' : 'Alerts'}
              </Badge>
            )}
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="current" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Current Alerts
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Alert Rules
            </TabsTrigger>
            <TabsTrigger value="new-rule" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              New Rule
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4 mt-6">
            <Suspense fallback={<LoadingCard />}>
              {alertsLoading ? (
                <LoadingCard />
              ) : (
                <AlertsList alerts={alerts || []} onResolve={resolveAlert} />
              )}
            </Suspense>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4 mt-6">
            <Suspense fallback={<LoadingCard />}>
              {rulesLoading ? (
                <LoadingCard />
              ) : (
                <ThresholdRulesList 
                  rules={rules || []} 
                  onDeleteRule={deleteRule} 
                  loading={rulesLoading}
                />
              )}
            </Suspense>
          </TabsContent>
          
          <TabsContent value="new-rule" className="space-y-4 mt-6">
            {modules && modules.length > 0 && selectedModule === null && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Module</CardTitle>
                  <CardDescription>
                    Choose a module to create a rule for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map(module => (
                      <Card 
                        key={module.id} 
                        className="cursor-pointer hover:bg-slate-50" 
                        onClick={() => setSelectedModule(module.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium">{module.name}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {selectedModule && modules && (
              <div>
                <Button variant="outline" onClick={() => setSelectedModule(null)} className="mb-4">
                  ← Back to module selection
                </Button>
                <RuleForm 
                  module={modules.find(m => m.id === selectedModule)!} 
                  onAddRule={handleAddRule}
                />
              </div>
            )}
            
            {!modules || modules.length === 0 ? (
              <Card>
                <CardContent className="p-6">
                  <p>No modules are available. Please add modules first.</p>
                </CardContent>
              </Card>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </PlatformLayout>
  );
};

export default RAGAlerts;
