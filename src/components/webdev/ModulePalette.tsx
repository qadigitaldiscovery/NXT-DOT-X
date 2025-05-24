
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Module {
  id: string;
  name: string;
  type: string;
}

interface ModulePaletteProps {
  modules: Module[];
}

const ModulePalette: React.FC<ModulePaletteProps> = ({ modules }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {modules.map((module) => (
            <div key={module.id} className="p-2 border rounded">
              <h4 className="font-medium">{module.name}</h4>
              <p className="text-sm text-muted-foreground">{module.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePalette;
