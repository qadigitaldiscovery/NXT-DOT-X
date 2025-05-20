import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface GaugeRatingProps {
  value: number;
  maxValue: number;
  label: string;
  description?: string;
}

export const GaugeRating: React.FC<GaugeRatingProps> = ({
  value,
  maxValue,
  label,
  description
}) => {
  // Calculate percentage and colors
  const percentage = (value / maxValue) * 100;
  const getColor = (percent: number) => {
    if (percent >= 90) return '#22C55E'; // green-500
    if (percent >= 70) return '#EAB308'; // yellow-500
    return '#EF4444'; // red-500
  };
  const color = getColor(percentage);

  // Calculate SVG arc parameters
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <svg
              className="transform -rotate-90 w-full h-full"
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              <circle
                className="text-gray-200"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                className="transition-all duration-300"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke={color}
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            {/* Value display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-4xl font-bold text-[${color}]`}>

                {value}
              </span>
            </div>
          </div>
          {description && (
            <p className="mt-4 text-sm text-gray-600 text-center">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
