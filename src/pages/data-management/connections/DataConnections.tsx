import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Cloud, Server, Check, AlertCircle } from 'lucide-react';

const DataConnections = () => {
  const connections = [
    { 
      id: 1, 
      name: 'SQL Database', 
      description: 'Primary SQL data warehouse connection', 
      type: 'database', 
      status: 'connected',
      lastSync: '2 hours ago' 
    },
    { 
      id: 2, 
      name: 'Cloud Storage', 
      description: 'AWS S3 storage bucket for document storage', 
      type: 'cloud', 
      status: 'connected',
      lastSync: '4 hours ago' 
    },
    { 
      id: 3, 
      name: 'API Integration', 
      description: 'External vendor API connection', 
      type: 'api', 
      status: 'error',
      lastSync: '1 day ago' 
    },
    { 
      id: 4, 
      name: 'Data Lake', 
      description: 'Big data storage for analytics', 
      type: 'database', 
      status: 'connected',
      lastSync: '30 minutes ago'
    }
  ];

  const getConnectionIcon = (type) => {
    switch(type) {
      case 'database':
        return <Database className="h-8 w-8 text-blue-500" />;
      case 'cloud':
        return <Cloud className="h-8 w-8 text-purple-500" />;
      case 'api':
        return <Server className="h-8 w-8 text-green-500" />;
      default:
        return <Database className="h-8 w-8 text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    return status === 'connected' 
      ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><Check className="h-3 w-3 mr-1" /> Connected</Badge>
      : <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertCircle className="h-3 w-3 mr-1" /> Error</Badge>;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Data Connections</h1>
          <p className="text-gray-600">Manage your data source connections</p>
        </div>
        <Button>Add New Connection</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map(connection => (
          <Card key={connection.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {getConnectionIcon(connection.type)}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(connection.status)}
                </div>
              </div>
              <CardTitle className="mt-2">{connection.name}</CardTitle>
              <CardDescription>{connection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Last synchronized: {connection.lastSync}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">Configure</Button>
              <Button variant="outline" size="sm">Test Connection</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataConnections; 