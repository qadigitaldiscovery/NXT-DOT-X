
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Users } from 'lucide-react';
import { type CustomerImpact } from '@/hooks/useCustomerImpacts';
import { format } from 'date-fns';

interface CustomerImpactsListProps {
  impacts: CustomerImpact[];
  loading: boolean;
}

const CustomerImpactsList: React.FC<CustomerImpactsListProps> = ({ impacts, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Impacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          Customer Impacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {impacts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No customer impacts reported.
          </div>
        ) : (
          <div className="space-y-4">
            {impacts.map((impact) => (
              <div 
                key={impact.id} 
                className="p-4 border rounded-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getImpactColor(impact.impact_level)}>
                      {impact.impact_level.charAt(0).toUpperCase() + impact.impact_level.slice(1)} Impact
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {impact.affected_customers} affected customers
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(impact.created_at), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
                <p className="text-sm">{impact.description}</p>
                {impact.resolved_at && (
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    ✓ Resolved on {format(new Date(impact.resolved_at), 'MMM dd, yyyy HH:mm')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerImpactsList;
