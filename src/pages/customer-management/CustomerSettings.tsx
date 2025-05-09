
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DefaultCustomerSettings } from '@/components/customers/settings/DefaultCustomerSettings';
import { CustomerColumnMappings } from '@/components/customers/settings/CustomerColumnMappings';

const CustomerSettings = () => {
  const [activeTab, setActiveTab] = useState('defaults');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure default settings and column mappings for customers.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="defaults">Default Settings</TabsTrigger>
            <TabsTrigger value="mappings">Column Mappings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="defaults" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Default Customer Settings</CardTitle>
                <CardDescription>
                  Configure default values when creating new customers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DefaultCustomerSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mappings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Column Mappings</CardTitle>
                <CardDescription>
                  Configure how customer file columns map to system fields.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerColumnMappings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerSettings;
