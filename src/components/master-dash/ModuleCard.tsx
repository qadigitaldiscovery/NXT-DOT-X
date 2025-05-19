
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModuleCardProps {
  title: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer border border-[#e5effc] dark:border-[#2d3748] bg-white dark:bg-[#1a1f2c]",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-[#f7faff] to-[#e5effc] dark:from-[#1a1f2c] dark:to-[#2d3748]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-[#005fea] dark:text-[#4cacfe]">{title}</CardTitle>
          {icon && <div className="text-[#005fea] dark:text-[#4cacfe]">{icon}</div>}
        </div>
      </CardHeader>
      {description && (
        <CardContent className="pt-4">
          <div className="text-sm text-muted-foreground">{description}</div>
        </CardContent>
      )}
    </Card>
  );
};
