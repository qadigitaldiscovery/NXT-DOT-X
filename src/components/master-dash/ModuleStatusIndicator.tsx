
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ModuleStatus = 'active' | 'inactive' | 'maintenance' | 'deprecated' | 'beta' | 'green' | 'orange' | 'red';

interface ModuleStatusIndicatorProps {
  status: ModuleStatus | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getStatusColor = (status: ModuleStatus | string): string => {
  switch (status) {
    case 'active':
    case 'green':
      return 'bg-green-500/15 text-green-500 border-green-500/30';
    case 'beta':
    case 'orange':
    case 'maintenance':
      return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
    case 'deprecated':
    case 'red':
    case 'inactive':
      return 'bg-red-500/15 text-red-500 border-red-500/30';
    default:
      return 'bg-slate-500/15 text-slate-500 border-slate-500/30';
  }
};

const getStatusText = (status: ModuleStatus | string): string => {
  switch (status) {
    case 'active':
    case 'inactive':
    case 'maintenance':
    case 'deprecated':
    case 'beta':
      return status.charAt(0).toUpperCase() + status.slice(1);
    case 'green':
      return 'Operational';
    case 'orange':
      return 'Degraded';
    case 'red':
      return 'Critical';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const getSizingClasses = (size: 'sm' | 'md' | 'lg'): string => {
  switch (size) {
    case 'sm':
      return 'text-xs px-1.5 py-0.5';
    case 'md':
      return 'text-sm px-2 py-1';
    case 'lg':
      return 'text-base px-3 py-1.5';
    default:
      return 'text-sm px-2 py-1';
  }
};

const ModuleStatusIndicator: React.FC<ModuleStatusIndicatorProps> = ({
  status,
  size = 'md',
  className,
}) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full font-medium border',
        getStatusColor(status as ModuleStatus | string),
        getSizingClasses(size),
        className
      )}
    >
      {getStatusText(status as ModuleStatus | string)}
    </Badge>
  );
};

export default ModuleStatusIndicator;
