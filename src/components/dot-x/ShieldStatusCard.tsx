
import { ArrowUpRight } from "lucide-react";

interface ShieldStatusProps {
  status?: {
    level: number;
    change: number;
    description: string;
  };
  onUpgrade?: () => void;
}

export const ShieldStatusCard = ({ 
  status = { 
    level: 1248, 
    change: 3.51, 
    description: "Shield Integrity" 
  } 
}: ShieldStatusProps) => {
  return (
    <div className="frosted-card h-full">
      <div className="glossy-overlay" />
      
      <div className="flex flex-col h-full">
        {/* Top indicator with arrow and percentage */}
        <div className="flex justify-between mb-4">
          <div className="bg-black-800/70 rounded-full p-2">
            <ArrowUpRight className="h-4 w-4 text-silver-300/70" />
          </div>
          <span className="text-emerald-400 font-medium tabular-nums">
            +{status.change}%
          </span>
        </div>
        
        {/* Main value */}
        <div className="mt-4 flex-1">
          <div className="flex items-end">
            <span className="text-4xl font-bold tracking-tight text-silver-100 tabular-nums">
              {status.level.toLocaleString()}
            </span>
          </div>
          <p className="text-silver-300/70 mt-1">{status.description}</p>
        </div>
      </div>
    </div>
  );
};
