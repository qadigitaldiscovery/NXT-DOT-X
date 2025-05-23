
import React from 'react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No tables found" }: EmptyStateProps) => {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyState;
