
import React, { useState, useEffect } from 'react';
import { useModules, Module, Feature } from '@/hooks/useModules';
import { useWebDev } from '@/context/WebDevContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, File, LayoutGrid, Menu } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ModulePalette: React.FC = () => {
  const { modules, loading } = useModules();
  const { addNode } = useWebDev();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const handleAddModule = (module: Module) => {
    addNode({
      type: 'module',
      position: { x: 100, y: 100 },
      data: {
        label: module.name,
        module: module,
        path: module.path || undefined
      },
    });
  };

  const handleAddMenu = (module: Module, featureIndex: number = 0) => {
    const feature = module.features && module.features.length > 0 
      ? module.features[featureIndex] 
      : { name: 'Menu Item', path: '/default-path' };
      
    addNode({
      type: 'menu',
      position: { x: 300, y: 100 },
      data: {
        label: feature?.name || 'Menu',
        path: feature?.path,
        feature,
      },
    });
  };

  const handleAddPage = (path?: string) => {
    addNode({
      type: 'page',
      position: { x: 500, y: 100 },
      data: {
        label: 'Page',
        path: path || '/new-page',
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Module Palette</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available Modules</h4>
            
            {loading ? (
              <p className="text-sm text-gray-500">Loading modules...</p>
            ) : (
              <Accordion type="multiple" className="space-y-2">
                {modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id} className="border rounded-md p-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <LayoutGrid className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">{module.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2"
                          onClick={() => handleAddModule(module)}
                        >
                          Add
                        </Button>
                        <AccordionTrigger className="p-0" />
                      </div>
                    </div>
                    
                    <AccordionContent>
                      {module.features && module.features.length > 0 ? (
                        <div className="pl-4 space-y-2 mt-2">
                          {module.features.map((feature, index) => (
                            <div key={index} className="flex justify-between items-center p-1 hover:bg-gray-100 rounded">
                              <div className="flex items-center">
                                <Menu className="h-3.5 w-3.5 mr-2 text-green-600" />
                                <span className="text-xs">{feature.name}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 text-xs"
                                onClick={() => handleAddMenu(module, index)}
                              >
                                Add
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 mt-2 pl-4">No features available</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Page Components</h4>
            <div className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2 text-amber-600" />
                <span className="text-sm">Page Component</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2"
                onClick={() => handleAddPage()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePalette;
