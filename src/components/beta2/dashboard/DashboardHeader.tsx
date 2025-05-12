
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export interface DashboardHeaderProps {
  title: string;
  description: string;
  heading?: string; // Add for backwards compatibility
  subheading?: string; // Add for backwards compatibility
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  heading,
  subheading
}) => {
  const navigate = useNavigate();
  
  // Use the new props if available, otherwise fall back to the old ones
  const displayTitle = heading || title;
  const displayDescription = subheading || description;
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{displayTitle}</h1>
        <p className="text-muted-foreground">{displayDescription}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate('/prototypes')}>
          Back to Selector
        </Button>
      </div>
    </div>
  );
};
