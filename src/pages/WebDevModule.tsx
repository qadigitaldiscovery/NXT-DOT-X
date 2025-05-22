
import React, { useState } from 'react';
import WebDevCanvas from '@/components/webdev/WebDevCanvas';
import ModulePalette from '@/components/webdev/ModulePalette';
import { useModules } from '@/hooks/useModules';
import { WebDevProvider } from '@/context/WebDevContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoutePreview from '@/components/webdev/RoutePreview';
import { Loader2 } from 'lucide-react';

const WebDevModule: React.FC = () => {
  const { modules, loading } = useModules();
  const [activeTab, setActiveTab] = useState('canvas');
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading module data...</span>
      </div>
    );
  }
  
  return (
    <WebDevProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">WebDev Route Mapping Tool</h1>
        <p className="text-muted-foreground mb-8">
          Visually connect modules, menus, and pages to create application routes
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="canvas">Visual Editor</TabsTrigger>
            <TabsTrigger value="preview">Route Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="canvas" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ModulePalette modules={modules} />
              </div>
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Canvas</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <WebDevCanvas />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <RoutePreview />
          </TabsContent>
        </Tabs>
      </div>
    </WebDevProvider>
  );
};

export default WebDevModule;
