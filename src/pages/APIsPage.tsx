
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Cloud, Settings, BrainCircuit, Plus, Api } from "lucide-react";
import ApiKeyForm from "@/components/tech-hub/api-management/ApiKeyForm";
import ApiEndpointList from "@/components/tech-hub/api-management/ApiEndpointList";
import ApiPermissionsTable from "@/components/tech-hub/api-management/ApiPermissionsTable";
import OpenAIKeyForm from "@/components/tech-hub/api-management/OpenAIKeyForm";
import AIChatTester from "@/components/tech-hub/api-management/AIChatTester";
import TechHubPersonas from './TechHubPersonas';

const TechHubApiManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("apis");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tech Hub API Management</h1>
          <p className="text-muted-foreground">Manage outgoing API connections and incoming API keys for the Tech Hub platform.</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="apis"><FileCode className="h-4 w-4 mr-1" />API Endpoints</TabsTrigger>
          <TabsTrigger value="keys"><Cloud className="h-4 w-4 mr-1" />API Keys</TabsTrigger>
          <TabsTrigger value="permissions"><Settings className="h-4 w-4 mr-1" />Permissions</TabsTrigger>
          <TabsTrigger value="openai"><Api className="h-4 w-4 mr-1" />OpenAI</TabsTrigger>
          <TabsTrigger value="personas"><BrainCircuit className="h-4 w-4 mr-1" />AI Assistance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apis">
          <ApiEndpointList />
        </TabsContent>
        
        <TabsContent value="keys">
          <ApiKeyForm />
        </TabsContent>
        
        <TabsContent value="permissions">
          <ApiPermissionsTable />
        </TabsContent>
        
        <TabsContent value="openai" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OpenAIKeyForm />
            <AIChatTester />
          </div>
        </TabsContent>
        
        <TabsContent value="personas">
          <TechHubPersonas />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechHubApiManagement;
