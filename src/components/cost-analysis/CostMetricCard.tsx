
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type CostMetricCardProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  className?: string;
};

export const CostMetricCard = ({ title, icon, value, change, className }: CostMetricCardProps) => {
  return (
    <Card className={`backdrop-blur-md bg-white/30 border border-white/10 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            {change.isPositive ? (
              <ArrowUpRight className={`h-3 w-3 ${change.isPositive ? "text-destructive" : "text-green-600"}`} />
            ) : (
              <ArrowDownRight className={`h-3 w-3 ${!change.isPositive ? "text-destructive" : "text-green-600"}`} />
            )}
            <span className={change.isPositive ? "text-destructive" : "text-green-600"}>
              {change.value}%
            </span> {change.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
