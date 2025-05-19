
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Server, Database, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const DeveloperAccess = () => {
  const navigate = useNavigate();

  return (
    <Card className="border rounded-lg overflow-hidden shadow-md flex flex-col h-full transition-all hover:shadow-lg bg-gradient-to-br from-gray-900 to-gray-800">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-b border-gray-700 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white text-lg md:text-xl">Developer Access</CardTitle>
          <CardDescription className="text-gray-300">Tools & APIs for technical users</CardDescription>
        </div>
        <Code className="h-6 w-6 text-white" />
      </CardHeader>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-md font-medium text-white">Systems & APIs</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button 
                variant="ghost" 
                className="justify-start h-auto py-2 px-3 text-gray-200 hover:text-white hover:bg-gray-700"
                onClick={() => navigate('/tech-hub/api-management')}
              >
                <Key className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">API Keys Management</p>
                  <p className="text-xs text-gray-400">Configure API credentials</p>
                </div>
              </Button>
              
              <Button 
                variant="ghost"
                className="justify-start h-auto py-2 px-3 text-gray-200 hover:text-white hover:bg-gray-700"
                onClick={() => navigate('/admin/database')}
              >
                <Database className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">Database Management</p>
                  <p className="text-xs text-gray-400">Run queries and view tables</p>
                </div>
              </Button>
              
              <Button 
                variant="ghost"
                className="justify-start h-auto py-2 px-3 text-gray-200 hover:text-white hover:bg-gray-700"
                onClick={() => navigate('/tech-hub/integrations')}
              >
                <Server className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">External Integrations</p>
                  <p className="text-xs text-gray-400">Connect to third-party services</p>
                </div>
              </Button>
            </div>
          </div>
          
          <Separator className="bg-gray-700" />
          
          <div className="space-y-2">
            <h3 className="text-md font-medium text-white">Developer Hub</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button 
                variant="secondary" 
                className="w-full justify-between border text-white"
                onClick={() => navigate('/tech-hub')}
              >
                <span>Open Developer Hub</span>
                <Code className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperAccess;
