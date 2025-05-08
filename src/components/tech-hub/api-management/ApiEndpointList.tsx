
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'error';
  lastUsed: string;
}

const sampleEndpoints: ApiEndpoint[] = [
  {
    id: '1',
    name: 'Product Data API',
    url: 'https://api.example.com/products',
    method: 'GET',
    status: 'active',
    lastUsed: '2025-05-07T14:32:11'
  },
  {
    id: '2',
    name: 'Order Processing',
    url: 'https://api.example.com/orders',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-05-08T09:15:22'
  },
  {
    id: '3',
    name: 'Legacy Inventory System',
    url: 'https://legacy.example.com/inventory',
    method: 'GET',
    status: 'error',
    lastUsed: '2025-05-01T10:45:30'
  },
  {
    id: '4',
    name: 'Customer Analytics',
    url: 'https://analytics.example.com/customers',
    method: 'GET',
    status: 'inactive',
    lastUsed: '2025-04-28T16:20:00'
  }
];

const ApiEndpointList: React.FC = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>(sampleEndpoints);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    toast.info("Opening endpoint configuration dialog");
    // In a real app, this would open a modal to add a new endpoint
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
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
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEndpoints.length > 0 ? (
                filteredEndpoints.map((endpoint) => (
                  <TableRow key={endpoint.id}>
                    <TableCell className="font-medium">{endpoint.name}</TableCell>
                    <TableCell className="font-mono text-sm flex items-center">
                      {endpoint.url}
                      <ExternalLink className="h-3 w-3 ml-1 text-gray-400" />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        endpoint.method === 'GET' ? 'border-blue-500 text-blue-500' :
                        endpoint.method === 'POST' ? 'border-green-500 text-green-500' :
                        endpoint.method === 'PUT' ? 'border-orange-500 text-orange-500' :
                        'border-red-500 text-red-500'
                      }>
                        {endpoint.method}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(endpoint.status)}</TableCell>
                    <TableCell>{new Date(endpoint.lastUsed).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleTestEndpoint(endpoint.id)}>
                        Test
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No endpoints found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiEndpointList;
