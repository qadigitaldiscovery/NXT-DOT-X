
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Shield, Globe, Layers } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  type: string;
}

interface ModulePaletteProps {
  modules: Module[];
}

const ModulePalette: React.FC<ModulePaletteProps> = ({ modules }) => {
  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'auth': return <Shield className="h-4 w-4" />;
      case 'data': return <Database className="h-4 w-4" />;
      case 'service': return <Globe className="h-4 w-4" />;
      default: return <Layers className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Available Modules</h3>
      <div className="space-y-2">
        {modules.map((module) => (
          <Card key={module.id} className="p-2 cursor-pointer hover:bg-gray-50">
            <CardContent className="p-2">
              <div className="flex items-center space-x-2">
                {getModuleIcon(module.type)}
                <span className="text-sm">{module.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModulePalette;
