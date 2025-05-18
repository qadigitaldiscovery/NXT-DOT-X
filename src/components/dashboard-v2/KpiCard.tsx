import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
}

const KpiCard = ({ title, value, change }: KpiCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
