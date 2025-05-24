
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon, SaveIcon } from 'lucide-react';
import { toast } from 'sonner';
import ModulePalette from '@/components/webdev/ModulePalette';
import WebDevCanvas from '@/components/webdev/WebDevCanvas';
import InspectorPanel from '@/components/webdev/InspectorPanel';

interface Module {
  id: string;
  name: string;
  type: string;
}

const WebDevModule = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [projectName, setProjectName] = useState('New Project');

  const modules: Module[] = [
    { id: '1', name: 'Authentication', type: 'auth' },
    { id: '2', name: 'Database', type: 'data' },
    { id: '3', name: 'API', type: 'service' },
    { id: '4', name: 'UI Components', type: 'component' }
  ];

  const handleSaveProject = () => {
    toast.success('Project saved successfully!');
  };

  const handleCreateNew = () => {
    setProjectName('New Project');
    toast.success('New project created!');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">WebDev Module</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="project-name">Project:</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-48"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleCreateNew}>
            <PlusIcon className="h-4 w-4 mr-2" />
            New
          </Button>
          <Button onClick={handleSaveProject}>
            <SaveIcon className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-80 border-r bg-white">
          <Tabs defaultValue="modules" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="inspector">Inspector</TabsTrigger>
            </TabsList>
            <TabsContent value="modules" className="p-4 h-full">
              <ModulePalette modules={modules} />
            </TabsContent>
            <TabsContent value="inspector" className="p-4 h-full">
              <InspectorPanel selectedNode={selectedNode} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <WebDevCanvas onNodeSelect={setSelectedNode} />
        </div>
      </div>
    </div>
  );
};

export default WebDevModule;
