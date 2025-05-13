
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface StatisticCardProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string | number;
  valueColor?: 'default' | 'success' | 'warning' | 'danger';
  icon?: ReactNode;
  className?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  value,
  label,
  trend,
  trendValue,
  valueColor = 'default',
  icon,
  className
}) => {
  const getColorClass = () => {
    switch (valueColor) {
      case 'success':
        return 'text-emerald-500';
      case 'warning':
        return 'text-amber-500';
      case 'danger':
        return 'text-red-500';
      default:
        return 'text-foreground';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <span className="text-emerald-500">↑</span>;
    if (trend === 'down') return <span className="text-red-500">↓</span>;
    return <span className="text-gray-500">→</span>;
  };

  return (
    <div className={cn(
      "rounded-lg bg-card/50 backdrop-blur p-4 border border-border/50 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <div className={cn("text-3xl font-bold", getColorClass())}>{value}</div>
        {trendValue && (
          <div className="text-xs text-muted-foreground flex items-center space-x-1 mb-1">
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticCard;
