import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatCurrency } from "../../../lib/utils";

interface CreditSummaryCardProps {
  rating: string;
  description: string;
  limit: string;
  score: number;
}

export const CreditSummaryCard: React.FC<CreditSummaryCardProps> = ({
  rating,
  description,
  limit,
  score
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating.toUpperCase()) {
      case 'A':
        return 'text-green-600';
      case 'B':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <p className={`text-2xl font-bold ${getRatingColor(rating)}`}>
              {rating}
            </p>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Credit Score</p>
            <p className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score}
            </p>
            <p className="text-sm text-gray-600">Out of 100</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Credit Limit</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(parseFloat(limit.replace(/[^0-9.-]+/g, '')))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
