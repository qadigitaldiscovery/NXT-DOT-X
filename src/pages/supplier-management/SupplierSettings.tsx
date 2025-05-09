
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DefaultSupplierSettings } from '@/components/suppliers/settings/DefaultSupplierSettings';
import { ColumnMappingsManager } from '@/components/suppliers/settings/ColumnMappingsManager';

const SupplierSettings = () => {
  const [activeTab, setActiveTab] = useState('defaults');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supplier Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure default settings and column mappings for suppliers.
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
              <CardTitle>Default Supplier Settings</CardTitle>
              <CardDescription>
                Configure default values when creating new suppliers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DefaultSupplierSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mappings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Column Mappings</CardTitle>
              <CardDescription>
                Configure how supplier file columns map to system fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ColumnMappingsManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierSettings;
