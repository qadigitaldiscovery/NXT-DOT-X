
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Module } from '@/hooks/useModules';
import StatusGauge from './StatusGauge';
import { formatDistanceToNow } from 'date-fns';
import { Eye, AlertCircle } from 'lucide-react';

type ModuleCardProps = {
  module: Module;
  alertCount: number;
  onViewDetails: (module: Module) => void;
}

export default function ModuleCard({ module, alertCount, onViewDetails }: ModuleCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <StatusGauge status={module.status} size="sm" />
          {alertCount > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>{alertCount}</span>
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{module.name}</CardTitle>
        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm pb-2">
        <div className="text-muted-foreground">
          Last updated {formatDistanceToNow(new Date(module.created_at), { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(module)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
