
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Database, Server, HardDrive, Network, Zap } from 'lucide-react';
import { useModules } from '@/context/ModulesContext';

const DotXDataServices = () => {
  const { hasAccess } = useModules();

  useEffect(() => {
    // Check module access
    const hasModuleAccess = hasAccess('dot-x', 'data-services');
    if (!hasModuleAccess) {
      toast.error('Access denied', {
        description: 'You do not have access to the DOT-X Data Services module'
      });
    }
  }, [hasAccess]);

  const handleConnectService = (service: string) => {
    toast.success(`Connected to ${service}`, {
      description: `Successfully established connection to ${service} service`
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DOT-X Data Services</h1>
        <p className="text-muted-foreground">Connect and manage DOT-X data pipelines and services</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              <span>Quantum Database</span>
            </CardTitle>
            <CardDescription>High-performance distributed database system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-500 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Nodes:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Storage:</span>
              <span className="font-medium">4.2 PB / 10 PB</span>
            </div>
            <Button 
              onClick={() => handleConnectService('Quantum Database')}
              className="w-full mt-2"
              variant="outline"
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-purple-500" />
              <span>Neural Processing</span>
            </CardTitle>
            <CardDescription>Advanced neural network processing service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-500 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Models:</span>
              <span className="font-medium">7</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Latency:</span>
              <span className="font-medium">12ms</span>
            </div>
            <Button 
              onClick={() => handleConnectService('Neural Processing')}
              className="w-full mt-2"
              variant="outline"
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-green-500" />
              <span>Data Vault</span>
            </CardTitle>
            <CardDescription>Secure encrypted storage system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-500 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Encryption:</span>
              <span className="font-medium">Level 10</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Backups:</span>
              <span className="font-medium">3 Active</span>
            </div>
            <Button 
              onClick={() => handleConnectService('Data Vault')}
              className="w-full mt-2"
              variant="outline"
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-amber-500" />
              <span>Mesh Network</span>
            </CardTitle>
            <CardDescription>Resilient distributed communication network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-500 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Nodes:</span>
              <span className="font-medium">248</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Throughput:</span>
              <span className="font-medium">1.2 TB/s</span>
            </div>
            <Button 
              onClick={() => handleConnectService('Mesh Network')}
              className="w-full mt-2"
              variant="outline"
            >
              Connect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-500" />
              <span>Quantum Compute</span>
            </CardTitle>
            <CardDescription>Next-generation quantum computation service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-500 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Qubits:</span>
              <span className="font-medium">128</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Jobs:</span>
              <span className="font-medium">3 Active</span>
            </div>
            <Button 
              onClick={() => handleConnectService('Quantum Compute')}
              className="w-full mt-2"
              variant="outline"
            >
              Connect
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DotXDataServices;
