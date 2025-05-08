
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Cloud, Settings, BrainCircuit } from "lucide-react";
import TechHubPersonas from './TechHubPersonas';

const TechHubApiManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tech Hub API Management</h1>
          <p className="text-muted-foreground">Manage outgoing API connections and incoming API keys for the Tech Hub platform.</p>
        </div>
      </div>
      
      <Tabs defaultValue="apis" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="apis"><FileCode className="h-4 w-4 mr-1" />API Endpoints</TabsTrigger>
          <TabsTrigger value="keys"><Cloud className="h-4 w-4 mr-1" />API Keys</TabsTrigger>
          <TabsTrigger value="permissions"><Settings className="h-4 w-4 mr-1" />Permissions</TabsTrigger>
          <TabsTrigger value="personas"><BrainCircuit className="h-4 w-4 mr-1" />AI Assistance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apis">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Configure and manage API endpoints and connections</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">API Endpoint management functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys and authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">API Key management functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>API Permissions</CardTitle>
              <CardDescription>Configure access control and permissions for APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">Permission management functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personas">
          <TechHubPersonas />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechHubApiManagement;
