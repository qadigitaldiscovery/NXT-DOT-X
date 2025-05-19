import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
}

export default function KpiCard({ title, value, change }: KpiCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge 
          variant={change >= 0 ? 'default' : 'destructive'}
          className="text-xs"
        >
          {change >= 0 ? '+' : ''}{change}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
