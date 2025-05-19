
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface DataCoreProps {
  core?: {
    activity: number;
    status: string;
  };
}

export const DataCoreCard = ({ core = { activity: 75, status: "Operational" } }: DataCoreProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0 rounded-3xl border-0 shadow-lg">
      <div className="p-6 flex flex-col">
        <h3 className="text-gray-300 mb-4 font-medium text-sm">Activity</h3>
        
        <div className="flex flex-col items-center justify-center py-3">
          <div className="relative h-36 w-36 flex items-center justify-center">
            {/* Background circle */}
            <div className="absolute h-full w-full rounded-full border-[16px] border-gray-700/40"></div>
            
            {/* Progress circle - calculate the stroke dash based on percentage */}
            <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                fill="none" 
                strokeWidth="16" 
                className="stroke-blue-500" 
                strokeDasharray={`${core.activity * 2.64} 264`} 
              />
            </svg>
            
            {/* Percentage text in center */}
            <div className="text-center">
              <span className="text-4xl font-bold">{core.activity}</span>
              <span className="text-2xl font-semibold">%</span>
            </div>
          </div>
          
          <p className="mt-2 text-xl font-medium text-center">Updates</p>
        </div>
      </div>
    </Card>
  );
};
