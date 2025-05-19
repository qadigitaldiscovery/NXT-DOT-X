
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { ShieldStatus } from '@/pages/dot-x/types';
import { format } from 'date-fns';

interface ShieldStatusCardProps {
  status: ShieldStatus;
  onUpgrade: () => void;
}

export function ShieldStatusCard({ status, onUpgrade }: ShieldStatusCardProps) {
  const getThreatColor = () => {
    switch (status.threatLevel) {
      case 'minimal': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'moderate': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-indigo-900/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            <span>Neural Shield</span>
          </CardTitle>
          <Badge variant="outline" className={getThreatColor()}>
            {status.threatLevel.charAt(0).toUpperCase() + status.threatLevel.slice(1)} Threat
          </Badge>
        </div>
        <CardDescription>Advanced protection system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Shield Level</span>
              <span className="text-xl font-bold">{status.level}/10</span>
            </div>
            <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Blocks</span>
              <span className="text-xl font-bold">{status.blockedAttacks.toLocaleString()}</span>
            </div>
          </div>
          
          {status.lastAttackDate && (
            <div className="p-3 bg-purple-950/20 rounded-lg">
              <span className="text-xs text-purple-300">Last Attack</span>
              <div className="text-sm font-medium">{format(status.lastAttackDate, 'PPp')}</div>
            </div>
          )}
          
          <div className="p-3 bg-purple-950/20 rounded-lg">
            <span className="text-xs text-purple-300">Encryption</span>
            <div className="text-sm font-medium">{status.encryptionStrength}</div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-100"
            onClick={onUpgrade}
            disabled={status.level >= 10}
          >
            <Shield className="h-4 w-4" />
            {status.level >= 10 ? 'Maximum Shield Level' : 'Enhance Shield'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
