
import React from 'react';
import { cn } from '@/lib/utils';

type StatusGaugeProps = {
  status: 'green' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
  showLabel?: boolean;
}

export default function StatusGauge({ 
  status, 
  size = 'md', 
  animate = true,
  className,
  showLabel = false
}: StatusGaugeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'orange':
        return 'bg-amber-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'green':
        return 'Operational';
      case 'orange':
        return 'Degraded';
      case 'red':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn(
          "rounded-full",
          getStatusColor(status),
          sizeClasses[size],
          animate && "animate-pulse",
          className
        )}
      />
      {showLabel && (
        <span className="text-sm font-medium">{getStatusLabel(status)}</span>
      )}
    </div>
  );
}
