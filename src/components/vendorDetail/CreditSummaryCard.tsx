
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/vendorCalculations';

interface CreditSummaryCardProps {
  rating: string;
  description: string;
  limit: number;
  localScore: number;
}

export function CreditSummaryCard({ rating, description, limit, localScore }: CreditSummaryCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Credit & Risk Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Rating</p>
            <p className="text-2xl font-semibold">{rating}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Risk Level</p>
            <p className="text-2xl font-semibold">{description}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Credit Limit</p>
            <p className="text-2xl font-semibold">{formatCurrency(limit)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Local Score</p>
            <p className="text-2xl font-semibold">{localScore}/100</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
