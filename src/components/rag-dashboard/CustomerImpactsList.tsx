
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type CustomerImpact } from '@/hooks/useCustomerImpacts';
import { formatDistanceToNow } from 'date-fns';
import { Users } from 'lucide-react';

type CustomerImpactsListProps = {
  impacts: CustomerImpact[];
  loading?: boolean;
}

export default function CustomerImpactsList({ impacts, loading = false }: CustomerImpactsListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Customer Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading customer impact data...</p>
        </CardContent>
      </Card>
    );
  }

  if (impacts.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Customer Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No customer impact reported.</p>
        </CardContent>
      </Card>
    );
  }

  const getImpactLevelVariant = (level: string | null): "default" | "destructive" | "outline" | "secondary" => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'secondary';
      case 'medium':
        return 'default';
      case 'high':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Customer Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {impacts.map((impact) => (
            <li key={impact.id} className="flex flex-col gap-2 border-b pb-3 last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {impact.impact_level && (
                    <Badge variant={getImpactLevelVariant(impact.impact_level)}>
                      {impact.impact_level.charAt(0).toUpperCase() + impact.impact_level.slice(1)} Impact
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(impact.recorded_at), { addSuffix: true })}
                  </span>
                </div>
                {impact.region && <span className="text-sm font-medium">{impact.region}</span>}
              </div>
              
              {impact.affected_users && (
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="font-semibold">{impact.affected_users.toLocaleString()}</span> users affected
                  </span>
                </div>
              )}
              
              {impact.description && (
                <p className="text-sm mt-1">{impact.description}</p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
