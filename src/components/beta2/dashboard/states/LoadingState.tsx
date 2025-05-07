
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-48 bg-white/20" />
      <Skeleton className="h-4 w-72 bg-white/20" />
      <Skeleton className="h-10 w-32 bg-white/20 mt-4" />
    </div>
  );
};
