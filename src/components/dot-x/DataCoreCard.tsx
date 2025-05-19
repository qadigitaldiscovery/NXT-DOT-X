
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { DataCore } from '@/pages/dot-x/types';

interface DataCoreCardProps {
  core: DataCore;
}

export function DataCoreCard({ core }: DataCoreCardProps) {
  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-indigo-900/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-purple-500" />
            <span>Data Core</span>
          </CardTitle>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
            Secure
          </Badge>
        </div>
        <CardDescription>Ultra-secure quantum-resistant data storage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Storage</span>
              <span className="text-xl font-bold">{core.storage}</span>
            </div>
            <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Encryption</span>
              <span className="text-xl font-bold">Level {core.encryptionLevel}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Backups</span>
              <span className="text-xl font-bold">{core.backups}</span>
            </div>
            <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Integrity</span>
              <span className="text-xl font-bold">{core.integrity}%</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-100"
          >
            <Database className="h-4 w-4" />
            Access Data Core
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
