
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface SettingsFormValues {
  enableNotifications: boolean;
  enableAutoRefresh: boolean;
  showCriticalOnly: boolean;
}

const RAGSettings = () => {
  const navigate = useNavigate();
  const { preferences, setPreferences, loading } = useUserPreferences({
    module: 'rag_dashboard',
    key: 'settings',
    defaultValue: {
      enableNotifications: true,
      enableAutoRefresh: true,
      showCriticalOnly: false
    }
  });

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      enableNotifications: preferences?.enableNotifications || true,
      enableAutoRefresh: preferences?.enableAutoRefresh || true,
      showCriticalOnly: preferences?.showCriticalOnly || false
    }
  });

  // Update form values when preferences load
  React.useEffect(() => {
    if (!loading && preferences) {
      form.reset({
        enableNotifications: preferences.enableNotifications,
        enableAutoRefresh: preferences.enableAutoRefresh,
        showCriticalOnly: preferences.showCriticalOnly
      });
    }
  }, [preferences, loading, form]);

  const onSubmit = async (data: SettingsFormValues) => {
    const result = await setPreferences(data);
    if (result.success) {
      toast.success("Settings saved successfully");
    } else {
      toast.error("Failed to save settings");
    }
  };

  if (loading) {
    return (
      <PlatformLayout moduleTitle="RAG Dashboard Settings" navCategories={ragDashboardNavigation}>
        <div className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <div className="h-7 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout moduleTitle="RAG Dashboard Settings" navCategories={ragDashboardNavigation}>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>RAG Dashboard Settings</CardTitle>
            <CardDescription>Configure your RAG dashboard preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="enableNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notifications</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts when system status changes
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableAutoRefresh"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Auto-refresh Dashboard</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Automatically refresh dashboard data every 60 seconds
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showCriticalOnly"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show Critical Only</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Filter dashboard to only show critical status modules
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Settings</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard/rag')}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PlatformLayout>
  );
};

export default RAGSettings;
