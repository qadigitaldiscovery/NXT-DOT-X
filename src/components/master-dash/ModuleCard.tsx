
import React from 'react';
import { Search } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  status: 'connected' | 'disconnected';
  icon: string;
  color: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  status,
  icon,
  color
}) => {
  // Function to get the appropriate icon component
  const getIcon = () => {
    switch (icon) {
      case 'chart-line':
        return <ChartLineIcon />;
      case 'chart-check':
        return <ChartCheckIcon />;
      case 'chart-wave':
        return <ChartWaveIcon />;
      case 'chart-rise':
        return <ChartRiseIcon />;
      case 'chart-data':
        return <ChartDataIcon />;
      case 'chart-map':
        return <ChartMapIcon />;
      default:
        return <ChartLineIcon />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <button className="text-slate-400 hover:text-white">
          <Search size={16} />
        </button>
      </div>
      
      {/* Card body with blue gradient background */}
      <div className="relative flex-grow rounded-md p-6 overflow-hidden bg-gradient-to-br from-blue-600/80 to-blue-400/60">
        {/* Blue overlay pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4xKSIvPjxyZWN0IHg9IjEiIHk9IjEiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsbD0icmdiYSg5MSwgMTc4LCAyNDUsIDAuMSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-50"></div>
        
        {/* Module icon */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-12 h-12 p-3 bg-white/20 rounded-md text-white">
            {getIcon()}
          </div>
        </div>
        
        {/* Module content */}
        <div className="relative">
          <h3 className="text-xl font-bold text-white mb-2">Connected</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
      
      {/* Status button */}
      <div className="mt-3">
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center">
          <span className="mr-2">•</span> CONNECTED
        </button>
      </div>
    </div>
  );
};

// Icon components
const ChartLineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
    <path d="M3 3v18h18" />
    <path d="m3 15 5-5 4 4 8-8" />
  </svg>
);

const ChartCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ChartWaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

const ChartRiseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
    <path d="m3 17 5-5 4 4 8-8" />
    <path d="m14 7 6 0 0 6" />
  </svg>
);

const ChartDataIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7v10" />
    <path d="M11 12v5" />
    <path d="M15 7v10" />
    <path d="M19 9v6" />
  </svg>
);

const ChartMapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
    <circle cx="12" cy="10" r="2" />
    <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
  </svg>
);
