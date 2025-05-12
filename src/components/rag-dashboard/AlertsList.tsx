
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Alert } from '@/hooks/useAlerts';
import { CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type AlertsListProps = {
  alerts: Alert[];
  onResolve: (id: string) => void;
  loading?: boolean;
}

export default function AlertsList({ alerts, onResolve, loading = false }: AlertsListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading alerts...</p>
        </CardContent>
      </Card>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No alerts at this time.</p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'info':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-amber-500';
      case 'destructive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSeverityVariant = (severity: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (severity) {
      case 'info':
        return 'secondary';
      case 'warning':
        return 'default';
      case 'destructive':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-start justify-between gap-2 border-b pb-3 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getSeverityVariant(alert.severity)}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(alert.triggered_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="font-medium">{alert.title}</p>
              </div>
              {!alert.resolved && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onResolve(alert.id)}
                  className="mt-1"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Resolve
                </Button>
              )}
              {alert.resolved && (
                <Badge variant="outline" className="mt-1">Resolved</Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
