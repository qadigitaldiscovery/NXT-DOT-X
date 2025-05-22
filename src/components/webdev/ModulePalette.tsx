
import React from 'react';
import { useWebDev } from '@/context/WebDevContext';
import { Module } from '@/hooks/useModules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle, LayoutGrid, Menu, File } from 'lucide-react';
import { toast } from 'sonner';

interface ModulePaletteProps {
  modules: Module[];
}

const ModulePalette: React.FC<ModulePaletteProps> = ({ modules }) => {
  const { addNode } = useWebDev();

  // Filter to show just the Data Management module as per requirements
  const dataManagementModule = modules.find(module => module.id === 'data-management');
  const filteredModules = dataManagementModule ? [dataManagementModule] : [];

  const handleAddModule = (module: Module) => {
    addNode({
      type: 'module',
      position: {
        x: 100,
        y: 100,
      },
      data: {
        label: module.name,
        path: module.path,
        module: module
      }
    });
    toast.success(`Added ${module.name} module to canvas`);
  };

  const handleAddFeature = (module: Module, feature: Module['features'][0]) => {
    addNode({
      type: 'menu',
      position: {
        x: 350,
        y: 100,
      },
      data: {
        label: feature.name,
        path: feature.path,
        feature: feature
      }
    });
    toast.success(`Added ${feature.name} menu to canvas`);
  };

  const handleAddPage = (pageName: string, pagePath: string) => {
    addNode({
      type: 'page',
      position: {
        x: 600,
        y: 100,
      },
      data: {
        label: pageName,
        path: pagePath,
      }
    });
    toast.success(`Added ${pageName} page to canvas`);
  };

  const dataManagementPages = [
    { name: 'Dashboard', path: '/dashboard/data-management' },
    { name: 'Cost Analysis', path: '/dashboard/data-management/cost-analysis' },
    { name: 'Supplier Costing', path: '/dashboard/data-management/supplier-costing' },
    { name: 'Documents', path: '/dashboard/data-management/documents' },
    { name: 'Price Management', path: '/dashboard/data-management/pricing' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="modules">
            <AccordionTrigger className="px-4">
              <div className="flex items-center">
                <LayoutGrid className="w-4 h-4 mr-2" />
                <span>Modules</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 px-4 pb-2">
                {filteredModules.map((module) => (
                  <Button
                    key={module.id}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => handleAddModule(module)}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> {module.name}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="menus">
            <AccordionTrigger className="px-4">
              <div className="flex items-center">
                <Menu className="w-4 h-4 mr-2" />
                <span>Menus</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 px-4 pb-2">
                {dataManagementModule?.features?.map((feature) => (
                  <Button
                    key={feature.path}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => handleAddFeature(dataManagementModule, feature)}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> {feature.name}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pages">
            <AccordionTrigger className="px-4">
              <div className="flex items-center">
                <File className="w-4 h-4 mr-2" />
                <span>Pages</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 px-4 pb-2">
                {dataManagementPages.map((page) => (
                  <Button
                    key={page.path}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => handleAddPage(page.name, page.path)}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> {page.name}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ModulePalette;
