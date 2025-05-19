
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { CommandoUnit } from '@/pages/dot-x/types';

interface CommandoUnitCardProps {
  unit: CommandoUnit;
  onDeploy: (unitId: string) => void;
}

export function CommandoUnitCard({ unit, onDeploy }: CommandoUnitCardProps) {
  const getStatusColor = () => {
    switch (unit.status) {
      case 'active': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'deployed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'standby': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-indigo-900/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            <span>{unit.name}</span>
          </CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>{unit.type} AI unit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex flex-col p-3 bg-blue-950/20 rounded-lg">
              <span className="text-xs text-blue-300">Deployments</span>
              <span className="text-xl font-bold">{unit.stats.deployments}</span>
            </div>
            <div className="flex flex-col p-3 bg-blue-950/20 rounded-lg">
              <span className="text-xs text-blue-300">Success Rate</span>
              <span className="text-xl font-bold">{unit.stats.successRate}%</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-xs text-blue-300">Capabilities:</h4>
            <div className="flex flex-wrap gap-1">
              {unit.capabilities.map((capability, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-950/30 hover:bg-blue-950/40 text-xs">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-100"
            onClick={() => onDeploy(unit.id)}
            disabled={unit.status === 'deployed'}
          >
            <Zap className="h-4 w-4" />
            Deploy Unit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
