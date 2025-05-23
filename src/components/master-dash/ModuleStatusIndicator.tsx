
import React from 'react';

interface ModuleStatusIndicatorProps {
  status: 'green' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

const ModuleStatusIndicator: React.FC<ModuleStatusIndicatorProps> = ({ 
  status, 
  size = 'md' 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'amber': return 'bg-amber-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'sm': return 'h-2 w-2';
      case 'md': return 'h-3 w-3';
      case 'lg': return 'h-4 w-4';
      default: return 'h-3 w-3';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'green': return 'All Systems Operational';
      case 'amber': return 'Some Issues Detected';
      case 'red': return 'Critical Issues';
      default: return 'Status Unknown';
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className={`rounded-full ${getStatusColor()} ${getSize()}`}></div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        System Status: {getStatusText()}
      </span>
    </div>
  );
};

export default ModuleStatusIndicator;
