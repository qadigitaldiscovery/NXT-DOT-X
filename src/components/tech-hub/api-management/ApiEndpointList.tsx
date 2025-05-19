
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApiEndpointRow from './ApiEndpointRow';
import AddEndpointDialog from './AddEndpointDialog';
import { Plus } from 'lucide-react';
import { sampleEndpoints } from './sampleData';
import { ApiEndpoint, EndpointFormValues } from './types';
import { v4 as uuidv4 } from 'uuid';

export function ApiEndpointList() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>(sampleEndpoints);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState<ApiEndpoint | null>(null);

  const handleAddEndpoint = (values: EndpointFormValues) => {
    const newEndpoint: ApiEndpoint = {
      id: uuidv4(),
      name: values.name,
      url: values.url,
      apiKey: values.apiKey,
      method: values.method,
      status: values.status,
      lastUsed: new Date().toISOString(),
      description: values.description
    };

    setEndpoints([...endpoints, newEndpoint]);
    setIsAddDialogOpen(false);
  };

  const handleEditEndpoint = (endpoint: ApiEndpoint) => {
    setCurrentEndpoint(endpoint);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEndpoint = (values: EndpointFormValues) => {
    if (!currentEndpoint) return;

    const updatedEndpoints = endpoints.map((ep) => {
      if (ep.id === currentEndpoint.id) {
        return {
          ...ep,
          name: values.name,
          url: values.url,
          apiKey: values.apiKey,
          method: values.method,
          status: values.status,
          description: values.description
        };
      }
      return ep;
    });

    setEndpoints(updatedEndpoints);
    setIsEditDialogOpen(false);
    setCurrentEndpoint(null);
  };

  const handleDeleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter((endpoint) => endpoint.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setEndpoints(
      endpoints.map((endpoint) => {
        if (endpoint.id === id) {
          const newStatus = endpoint.status === 'active' ? 'inactive' : 'active';
          return { ...endpoint, status: newStatus };
        }
        return endpoint;
      })
    );
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentEndpoint(null);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">API Endpoints</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Endpoint
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {endpoints.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No endpoints configured. Click "Add Endpoint" to create one.
            </div>
          ) : (
            endpoints.map((endpoint) => (
              <ApiEndpointRow
                key={endpoint.id}
                endpoint={endpoint}
                onEdit={handleEditEndpoint}
                onDelete={handleDeleteEndpoint}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </div>
      </CardContent>

      {/* Add Endpoint Dialog */}
      <AddEndpointDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddEndpoint}
      />

      {/* Edit Endpoint Dialog */}
      <AddEndpointDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateEndpoint}
        endpoint={currentEndpoint}
        onClose={handleCloseEditDialog}
      />
    </Card>
  );
}

export default ApiEndpointList;
