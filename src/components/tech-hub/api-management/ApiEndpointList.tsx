
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleEndpoints } from './sampleData';
import { ApiEndpoint } from './types';
import { ApiEndpointRow } from './ApiEndpointRow';
import { AddEndpointDialog } from './AddEndpointDialog';
import { toast } from 'sonner';

export function ApiEndpointList() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  
  useEffect(() => {
    // Load endpoints from localStorage or use sample data
    const storedEndpoints = localStorage.getItem('apiEndpoints');
    if (storedEndpoints) {
      setEndpoints(JSON.parse(storedEndpoints));
    } else {
      // Use sample data as fallback - ensure it's typed correctly
      setEndpoints(sampleEndpoints as ApiEndpoint[]);
    }
  }, []);
  
  const handleAddEndpoint = (newEndpoint: ApiEndpoint) => {
    const updatedEndpoints = [...endpoints, newEndpoint];
    setEndpoints(updatedEndpoints);
    localStorage.setItem('apiEndpoints', JSON.stringify(updatedEndpoints));
    toast.success(`Endpoint "${newEndpoint.name}" added successfully`);
  };
  
  const handleEditEndpoint = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setShowAddDialog(true);
  };
  
  const handleUpdateEndpoint = (updatedEndpoint: ApiEndpoint) => {
    const index = endpoints.findIndex(ep => ep.id === updatedEndpoint.id);
    if (index !== -1) {
      const newEndpoints = [...endpoints];
      newEndpoints[index] = updatedEndpoint;
      setEndpoints(newEndpoints);
      localStorage.setItem('apiEndpoints', JSON.stringify(newEndpoints));
      toast.success(`Endpoint "${updatedEndpoint.name}" updated successfully`);
    }
  };
  
  const handleDeleteEndpoint = (id: string) => {
    const newEndpoints = endpoints.filter(endpoint => endpoint.id !== id);
    setEndpoints(newEndpoints);
    localStorage.setItem('apiEndpoints', JSON.stringify(newEndpoints));
    toast.info('Endpoint deleted successfully');
  };
  
  const handleOpenAddDialog = () => {
    setSelectedEndpoint(null);
    setShowAddDialog(true);
  };
  
  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setSelectedEndpoint(null);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>
            Configure endpoints for different AI providers
          </CardDescription>
        </div>
        <Button onClick={handleOpenAddDialog}>
          Add Endpoint
        </Button>
      </CardHeader>
      <CardContent>
        {endpoints.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No endpoints configured yet.</p>
            <Button 
              variant="outline" 
              onClick={handleOpenAddDialog}
              className="mt-4"
            >
              Add your first endpoint
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {endpoints.map(endpoint => (
              <ApiEndpointRow
                key={endpoint.id}
                endpoint={endpoint}
                onEdit={() => handleEditEndpoint(endpoint)}
                onDelete={() => handleDeleteEndpoint(endpoint.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
      
      <AddEndpointDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        endpoint={selectedEndpoint}
        onAdd={handleAddEndpoint}
        onUpdate={handleUpdateEndpoint}
        onClose={handleCloseDialog}
      />
    </Card>
  );
}
