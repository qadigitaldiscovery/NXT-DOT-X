
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import { QuantumCore } from '@/pages/dot-x/types';

interface QuantumCoreCardProps {
  core: QuantumCore;
}

export function QuantumCoreCard({ core }: QuantumCoreCardProps) {
  const getStatusColor = () => {
    switch (core.status) {
      case 'online': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'offline': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'maintenance': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  return (
    <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-fuchsia-900/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-indigo-500" />
            <span>Quantum Core</span>
          </CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            {core.status.charAt(0).toUpperCase() + core.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>Next-generation computation system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-indigo-950/20 rounded-lg">
              <span className="text-xs text-indigo-300">Processing Power</span>
              <span className="text-xl font-bold">{core.processingPower}</span>
            </div>
            <div className="flex flex-col p-3 bg-indigo-950/20 rounded-lg">
              <span className="text-xs text-indigo-300">Algorithms</span>
              <span className="text-xl font-bold">{core.algorithms}</span>
            </div>
          </div>
          
          <div className="p-3 bg-indigo-950/20 rounded-lg">
            <span className="text-xs text-indigo-300">System Efficiency</span>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-indigo-950/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500"
                  style={{ width: `${core.efficiency}%` }}
                />
              </div>
              <span className="text-xs font-medium">{core.efficiency}%</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-100"
          >
            <Code className="h-4 w-4" />
            Access Quantum Core
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
