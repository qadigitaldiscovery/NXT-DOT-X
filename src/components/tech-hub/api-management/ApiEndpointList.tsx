
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { ApiEndpoint, EndpointFormValues } from './types';
import { sampleEndpoints } from './sampleData';
import EndpointsTable from './EndpointsTable';
import AddEndpointDialog from './AddEndpointDialog';

const LOCAL_STORAGE_KEY = 'tech-hub-api-endpoints';

const ApiEndpointList: React.FC = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});
  
  // Load endpoints from localStorage on initial render
  useEffect(() => {
    const storedEndpoints = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEndpoints) {
      setEndpoints(JSON.parse(storedEndpoints));
    } else {
      // Use sample data as fallback
      setEndpoints(sampleEndpoints);
    }
  }, []);
  
  // Save endpoints to localStorage whenever they change
  useEffect(() => {
    if (endpoints.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(endpoints));
    }
  }, [endpoints]);
  
  const filteredEndpoints = endpoints.filter(endpoint => 
    endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    endpoint.url.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleTestEndpoint = (id: string) => {
    toast.info(`Testing API endpoint ${id}...`);
    // In a real app, this would make an actual API call to test the endpoint
    setTimeout(() => {
      toast.success(`API endpoint ${id} is responding correctly`);
    }, 1500);
  };
  
  const handleAddEndpoint = () => {
    setDialogOpen(true);
  };

  const toggleApiKeyVisibility = (id: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyApiKey = (apiKey: string, name: string) => {
    navigator.clipboard.writeText(apiKey);
    toast.success(`API key for ${name} copied to clipboard`);
  };
  
  const handleDeleteEndpoint = (id: string, name: string) => {
    // Filter out the endpoint with the given id
    const updatedEndpoints = endpoints.filter(endpoint => endpoint.id !== id);
    setEndpoints(updatedEndpoints);
    
    // Update localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEndpoints));
    
    // Show confirmation message
    toast.success(`API endpoint "${name}" has been deleted`);
  };

  const onSubmit = (data: EndpointFormValues) => {
    // Create a new endpoint with the form data
    const newEndpoint: ApiEndpoint = {
      id: `${Date.now()}`, // Use timestamp for unique ID
      name: data.name,
      url: data.url,
      apiKey: data.apiKey,
      method: data.method,
      status: data.status,
      lastUsed: new Date().toISOString()
    };

    // Add the new endpoint to the list
    const updatedEndpoints = [...endpoints, newEndpoint];
    setEndpoints(updatedEndpoints);
    
    // Save to localStorage immediately as well
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEndpoints));
    
    // Close the dialog
    setDialogOpen(false);
    
    // Show a success message
    toast.success(`API endpoint "${data.name}" has been added successfully`);
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Configure and manage connected API endpoints</CardDescription>
          </div>
          <Button onClick={handleAddEndpoint}>
            <Plus className="h-4 w-4 mr-1" /> Add Endpoint
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Search endpoints..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <EndpointsTable 
            endpoints={filteredEndpoints}
            showApiKeys={showApiKeys}
            onToggleApiKey={toggleApiKeyVisibility}
            onCopyApiKey={copyApiKey}
            onTestEndpoint={handleTestEndpoint}
            onDeleteEndpoint={handleDeleteEndpoint}
          />
        </CardContent>
      </Card>

      <AddEndpointDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ApiEndpointList;
