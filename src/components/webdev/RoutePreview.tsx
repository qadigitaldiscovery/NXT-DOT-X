
import React from 'react';
import { useWebDev } from '@/context/WebDevContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

const RoutePreview: React.FC = () => {
  const { generateRoutes } = useWebDev();

  const routes = generateRoutes();

  const handleCopyCode = () => {
    const routesCode = generateRoutesCode();
    navigator.clipboard.writeText(routesCode);
    toast.success('Code copied to clipboard');
  };

  const handleDownloadCode = () => {
    const routesCode = generateRoutesCode();
    const blob = new Blob([routesCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generatedRoutes.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Routes file downloaded');
  };

  const generateRoutesCode = () => {
    const routeImports = routes.map((route) => 
      `import ${route.component.replace(/\s/g, '')} from '@/pages/data-management/${route.component.toLowerCase().replace(/\s/g, '')}';`
    );

    const uniqueImports = Array.from(new Set(routeImports)).join('\n');

    const routesJsx = routes.map((route) => 
      `  <Route key="${route.path}" path="${route.path}" element={<${route.component.replace(/\s/g, '')} />} />`
    ).join('\n');

    return `import React from 'react';
import { Route } from 'react-router-dom';

${uniqueImports}

export const DataManagementRoutes = () => {
  return [
${routesJsx}
  ];
};
`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Routes</CardTitle>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={handleCopyCode}>
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
          <Button size="sm" variant="outline" onClick={handleDownloadCode}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {routes.length > 0 ? (
          <pre className="bg-slate-50 p-4 rounded-md overflow-auto max-h-96">
            <code>{generateRoutesCode()}</code>
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Code className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-500">No routes generated yet. Connect modules, menus, and pages in the visual editor.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoutePreview;
