
import React from 'react';

interface TopbarProps {
  title?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard' }) => {
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background">
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center space-x-4">
        {/* Add content for the right side of the topbar here if needed */}
      </div>
    </div>
  );
};

export default Topbar;
