
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, X } from 'lucide-react';
import { getAvailablePages, PageInfo } from '@/utils/pageDiscovery';

interface WidgetContainer {
  id: string;
  pageComponent: React.ComponentType | null;
  pageName: string | null;
}

const WidgetGrid: React.FC = () => {
  const [containers, setContainers] = useState<WidgetContainer[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availablePages, setAvailablePages] = useState<PageInfo[]>([]);

  // Initialize 16 empty containers (4x4 grid)
  useEffect(() => {
    const initialContainers = Array.from({ length: 16 }, (_, index) => ({
      id: `container-${index}`,
      pageComponent: null,
      pageName: null
    }));
    setContainers(initialContainers);
    
    // Load available pages
    setAvailablePages(getAvailablePages());
  }, []);

  const handleContainerClick = (containerId: string) => {
    setSelectedContainer(containerId);
    setIsDialogOpen(true);
  };

  const handlePageSelect = (pageOption: PageInfo) => {
    if (selectedContainer) {
      setContainers(prev => prev.map(container => 
        container.id === selectedContainer 
          ? { ...container, pageComponent: pageOption.component, pageName: pageOption.name }
          : container
      ));
      setIsDialogOpen(false);
      setSelectedContainer(null);
    }
  };

  const handleRemoveWidget = (containerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContainers(prev => prev.map(container => 
      container.id === containerId 
        ? { ...container, pageComponent: null, pageName: null }
        : container
    ));
  };

  const renderContainer = (container: WidgetContainer) => {
    if (!container.pageComponent) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <div className="text-center">
            <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click to add page</p>
          </div>
        </div>
      );
    }

    const PageComponent = container.pageComponent;
    
    return (
      <div className="h-full relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 z-10 h-6 w-6 bg-white/80 hover:bg-white"
          onClick={(e) => handleRemoveWidget(container.id, e)}
        >
          <X className="h-3 w-3" />
        </Button>
        <div className="h-full overflow-hidden border-2 border-gray-200 rounded bg-white">
          <div className="transform scale-[0.15] origin-top-left w-[666%] h-[666%] pointer-events-none">
            <React.Suspense fallback={
              <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-lg text-gray-500">Loading...</div>
              </div>
            }>
              <div className="bg-white min-h-screen">
                <PageComponent />
              </div>
            </React.Suspense>
          </div>
        </div>
        <div className="absolute bottom-1 left-1 right-1 bg-black/80 text-white text-xs p-1 rounded truncate">
          {container.pageName}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Widget Dashboard</h1>
        <p className="text-gray-600 mt-2">Click on any container to add a page preview</p>
      </div>
      
      <div className="grid grid-cols-4 gap-6 max-w-7xl">
        {containers.map((container) => (
          <Card 
            key={container.id} 
            className="h-64 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 hover:border-blue-400 bg-white"
            onClick={() => handleContainerClick(container.id)}
          >
            <CardContent className="p-3 h-full">
              {renderContainer(container)}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select a Page for Widget Preview</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-96">
            <div className="grid grid-cols-3 gap-3 p-4">
              {availablePages.map((page, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start text-left hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => handlePageSelect(page)}
                >
                  <div className="font-medium text-sm">{page.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{page.path}</div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WidgetGrid;
