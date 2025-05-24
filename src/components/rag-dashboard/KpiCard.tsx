
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KpiCardProps {
  title: string;
  value: number;
  status: 'Red' | 'Amber' | 'Green';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Green': return 'bg-green-500';
      case 'Amber': return 'bg-yellow-500';
      case 'Red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Green': return 'default';
      case 'Amber': return 'secondary';
      case 'Red': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}%</div>
          <Badge variant={getStatusVariant(status) as any}>
            {status}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getStatusColor(status)}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
