
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreditSummaryProps {
  rating: string;
  description: string;
  limit: string;
  score: number;
}

export const CreditSummaryCard: React.FC<CreditSummaryProps> = ({
  rating,
  description,
  limit,
  score
}) => {
  // Determine color based on rating
  const getRatingColor = (rating: string) => {
    switch(rating.toUpperCase()) {
      case 'A':
      case 'B':
        return 'text-green-500';
      case 'C':
        return 'text-yellow-500';
      case 'D':
      case 'E':
      case 'F':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const ratingColor = getRatingColor(rating);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Credit Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r pr-4">
            <div className="text-sm text-muted-foreground mb-1">Rating</div>
            <div className={`text-3xl font-bold ${ratingColor}`}>{rating}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Description</div>
            <div className={`text-base font-medium ${ratingColor}`}>{description}</div>
          </div>
          <div className="border-r pr-4">
            <div className="text-sm text-muted-foreground mb-1">Credit Limit</div>
            <div className="text-lg font-medium">{limit}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Local Score</div>
            <div className="text-lg font-medium">{score}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
