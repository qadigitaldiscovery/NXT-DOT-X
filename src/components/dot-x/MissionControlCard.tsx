
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';
import { MissionStatus } from '@/pages/dot-x/types';

interface MissionControlCardProps {
  status: MissionStatus;
}

export function MissionControlCard({ status }: MissionControlCardProps) {
  const successRate = status.completed > 0 
    ? Math.round((status.success / status.completed) * 100) 
    : 0;
  
  return (
    <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-teal-900/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-green-500" />
            <span>Mission Control</span>
          </CardTitle>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Online
          </Badge>
        </div>
        <CardDescription>Command and control interface</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
              <span className="text-xs text-green-300">Active Missions</span>
              <span className="text-xl font-bold">{status.active}</span>
            </div>
            <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
              <span className="text-xs text-green-300">Success Rate</span>
              <span className="text-xl font-bold">{successRate}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
              <span className="text-xs text-green-300">Completed</span>
              <span className="text-xl font-bold">{status.completed}</span>
            </div>
            <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
              <span className="text-xs text-green-300">Pending</span>
              <span className="text-xl font-bold">{status.pending}</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-100"
          >
            <BarChart2 className="h-4 w-4" />
            Open Mission Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
