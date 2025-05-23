
import React from 'react';
import { useWebDev } from '@/context/WebDevContext';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

const RoutePreview: React.FC = () => {
  const { generateRoutes } = useWebDev();
  
  const routes = generateRoutes ? generateRoutes() : '';
  
  const handleCopy = () => {
    if (routes) {
      navigator.clipboard.writeText(routes);
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Route Preview</h3>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>
      
      <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-xs whitespace-pre">
        {routes || 'No routes defined yet.'}
      </pre>
    </div>
  );
};

export default RoutePreview;
