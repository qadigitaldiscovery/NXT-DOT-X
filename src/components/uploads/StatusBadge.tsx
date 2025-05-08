
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Play, CheckCircle, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          Pending
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
          <Play className="h-3.5 w-3.5" />
          Processing
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-600">
          <CheckCircle className="h-3.5 w-3.5" />
          Completed
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Failed
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
