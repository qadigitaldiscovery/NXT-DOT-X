
import React from 'react';

interface StatusGaugeProps {
  status: string;
  size: "sm" | "md" | "lg";
  animate?: boolean;
  showLabel?: boolean;
}

const StatusGauge: React.FC<StatusGaugeProps> = ({ status, size = "md", animate = true, showLabel = false }) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24"
  };
  
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'green': return '#10b981';
      case 'orange': return '#f59e0b';
      case 'red': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'green': return 'Operational';
      case 'orange': return 'Degraded';
      case 'red': return 'Outage';
      default: return 'Unknown';
    }
  };

  const color = getStatusColor(status);
  const sizeClass = sizeClasses[size];
  
  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClass}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            className="dark:stroke-gray-700"
          />
          {/* Colored status circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset="0"
            className={`${animate ? 'transition-all duration-500 ease-in-out' : ''}`}
          />
        </svg>
        {/* Status dot in the center */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ color }}
        >
          <div 
            className="rounded-full"
            style={{ 
              backgroundColor: color,
              width: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px',
              height: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px'
            }}
          />
        </div>
      </div>
      {showLabel && (
        <div className="text-sm font-medium mt-2" style={{ color }}>
          {getStatusText(status)}
        </div>
      )}
    </div>
  );
};

export default StatusGauge;
