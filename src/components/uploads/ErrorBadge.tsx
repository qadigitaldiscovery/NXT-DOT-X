
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ErrorBadgeProps {
  errorRows: number;
  status: string;
}

export function ErrorBadge({ errorRows, status }: ErrorBadgeProps) {
  if (errorRows > 0) {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-800">
        {errorRows} errors
      </Badge>
    );
  } 
  
  if (status === 'completed') {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-800">
        No errors
      </Badge>
    );
  }
  
  return <>—</>;
}
