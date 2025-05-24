
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X, Maximize } from 'lucide-react';
import { getAvailablePages, PageInfo } from '@/utils/pageDiscovery';

interface WidgetContainer {
  id: string;
  pageComponent: React.ComponentType | null;
  pageName: string | null;
  pagePath: string | null;
}

interface EnhancedWidgetGridProps {
  onWidgetClick: (widget: WidgetContainer) => void;
}

const STORAGE_KEY = 'dashboard-widget-allocations';

export const EnhancedWidgetGrid: React.FC<EnhancedWidgetGridProps> = ({ onWidgetClick }) => {
  const [containers, setContainers] = useState<WidgetContainer[]>([]);

  // Initialize 16 empty containers and load saved allocations
  useEffect(() => {
    const savedAllocations = localStorage.getItem(STORAGE_KEY);
    let initialContainers: WidgetContainer[];

    if (savedAllocations) {
      try {
        const parsed = JSON.parse(savedAllocations);
        // Convert saved data to include components
        const availablePages = getAvailablePages();
        initialContainers = parsed.map((saved: any) => {
          if (saved.pageName && saved.pagePath) {
            const matchingPage = availablePages.find(page => 
              page.name === saved.pageName && page.path === saved.pagePath
            );
            return {
              ...saved,
              pageComponent: matchingPage?.component || null
            };
          }
          return saved;
        });
      } catch (error) {
        console.error('Failed to parse saved allocations:', error);
        initialContainers = createEmptyContainers();
      }
    } else {
      initialContainers = createEmptyContainers();
    }

    setContainers(initialContainers);
  }, []);

  const createEmptyContainers = (): WidgetContainer[] => {
    return Array.from({ length: 16 }, (_, index) => ({
      id: `container-${index}`,
      pageComponent: null,
      pageName: null,
      pagePath: null
    }));
  };

  // Save allocations to localStorage whenever containers change
  useEffect(() => {
    const allocationsToSave = containers.map(container => ({
      id: container.id,
      pageName: container.pageName,
      pagePath: container.pagePath,
      pageComponent: null // Don't save the component function
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allocationsToSave));
  }, [containers]);

  const handleDrop = (e: React.DragEvent, containerId: string) => {
    e.preventDefault();
    
    // Try to get page info from drag data
    let pageInfo: PageInfo | null = null;
    
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        pageInfo = JSON.parse(jsonData);
      }
    } catch (error) {
      // Fallback to text data
      const pageName = e.dataTransfer.getData('text/plain');
      if (pageName) {
        const availablePages = getAvailablePages();
        pageInfo = availablePages.find(page => page.name === pageName) || null;
      }
    }

    if (pageInfo) {
      setContainers(prev => prev.map(container => 
        container.id === containerId 
          ? { 
              ...container, 
              pageComponent: pageInfo!.component, 
              pageName: pageInfo!.name,
              pagePath: pageInfo!.path
            }
          : container
      ));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveWidget = (containerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContainers(prev => prev.map(container => 
      container.id === containerId 
        ? { ...container, pageComponent: null, pageName: null, pagePath: null }
        : container
    ));
  };

  const handleWidgetClick = (container: WidgetContainer) => {
    if (container.pageComponent) {
      onWidgetClick(container);
    }
  };

  const renderContainer = (container: WidgetContainer) => {
    if (!container.pageComponent) {
      return (
        <div 
          className="h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors border-2 border-dashed border-gray-300 rounded-lg"
          onDrop={(e) => handleDrop(e, container.id)}
          onDragOver={handleDragOver}
        >
          <div className="text-center p-4">
            <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Drop page here</p>
          </div>
        </div>
      );
    }

    const PageComponent = container.pageComponent;
    
    return (
      <div className="h-full relative">
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-white/90 hover:bg-white shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleWidgetClick(container);
            }}
          >
            <Maximize className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-white/90 hover:bg-white shadow-sm"
            onClick={(e) => handleRemoveWidget(container.id, e)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div 
          className="h-full overflow-hidden border-2 border-gray-200 rounded bg-white cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => handleWidgetClick(container)}
        >
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
    <div className="grid grid-cols-4 gap-6 max-w-7xl">
      {containers.map((container) => (
        <Card 
          key={container.id} 
          className="h-64 transition-all duration-200 border-2 hover:shadow-xl bg-white"
        >
          <CardContent className="p-3 h-full">
            {renderContainer(container)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
