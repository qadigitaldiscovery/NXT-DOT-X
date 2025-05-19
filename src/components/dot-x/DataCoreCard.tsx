
import { Card } from "@/components/ui/card";

interface DataCoreProps {
  core?: {
    activity: number;
    status: string;
  };
}

export const DataCoreCard = ({ core = { activity: 75, status: "Operational" } }: DataCoreProps) => {
  return (
    <div className="frosted-card h-full">
      <div className="glossy-overlay" />
      
      <div className="flex flex-col h-full">
        <h3 className="text-silver-300/80 mb-4 font-medium text-sm">Core Activity</h3>
        
        <div className="flex flex-col items-center justify-center py-3 flex-1">
          <div className="relative h-36 w-36 flex items-center justify-center">
            {/* Background circle */}
            <div className="absolute h-full w-full rounded-full border-[16px] border-black-800/70"></div>
            
            {/* Progress circle - calculate the stroke dash based on percentage */}
            <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8E0D0D" />
                  <stop offset="100%" stopColor="#BFBFBF" />
                </linearGradient>
              </defs>
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                fill="none" 
                strokeWidth="16" 
                stroke="url(#progressGradient)" 
                strokeDasharray={`${core.activity * 2.64} 264`} 
              />
            </svg>
            
            {/* Percentage text in center */}
            <div className="text-center">
              <span className="text-4xl font-bold tabular-nums text-silver-100">{core.activity}</span>
              <span className="text-2xl font-semibold text-silver-300/80">%</span>
            </div>
          </div>
          
          <p className="mt-2 text-xl font-medium text-center text-silver-300">System Status</p>
          <p className="text-silver-300/70 text-sm mt-1">{core.status}</p>
        </div>
      </div>
    </div>
  );
};
