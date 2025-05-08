
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// Create a schema for adding new endpoints
const endpointSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Please enter a valid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  status: z.enum(["active", "inactive"])
});

type EndpointFormValues = z.infer<typeof endpointSchema>;

const ApiEndpointList: React.FC = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>(sampleEndpoints);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm<EndpointFormValues>({
    resolver: zodResolver(endpointSchema),
    defaultValues: {
      name: "",
      url: "",
      method: "GET",
      status: "active"
    }
  });
  
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

  const onSubmit = (data: EndpointFormValues) => {
    // Create a new endpoint with the form data
    const newEndpoint: ApiEndpoint = {
      id: `${endpoints.length + 1}`,
      name: data.name,
      url: data.url,
      method: data.method,
      status: data.status,
      lastUsed: new Date().toISOString()
    };

    // Add the new endpoint to the list
    setEndpoints([...endpoints, newEndpoint]);
    
    // Close the dialog and reset the form
    setDialogOpen(false);
    form.reset();
    
    // Show a success message
    toast.success(`API endpoint "${data.name}" has been added successfully`);
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

      {/* Add Endpoint Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add API Endpoint</DialogTitle>
            <DialogDescription>
              Add a new API endpoint to your Tech Hub. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Analytics API" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.example.com/v1/data" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Method</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Endpoint</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiEndpointList;
