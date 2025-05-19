
import { Activity } from "lucide-react";

interface MissionControlProps {
  status?: {
    activeOperations: number;
    completedTasks: number;
    efficiency: number;
  };
}

export const MissionControlCard = ({ 
  status = { 
    activeOperations: 6, 
    completedTasks: 28, 
    efficiency: 92 
  } 
}: MissionControlProps) => {
  return (
    <div className="frosted-card h-full">
      <div className="glossy-overlay" />
      
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-silver-300/80 font-medium">Mission Status</h3>
          <Activity className="h-5 w-5 text-silver-300/70" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-black-800/50 p-3 rounded-xl">
            <div className="text-2xl font-bold text-silver-100 tabular-nums">{status.activeOperations}</div>
            <div className="text-xs text-silver-300/60 mt-1">Active Operations</div>
          </div>
          
          <div className="bg-black-800/50 p-3 rounded-xl">
            <div className="text-2xl font-bold text-silver-100 tabular-nums">{status.completedTasks}</div>
            <div className="text-xs text-silver-300/60 mt-1">Completed Tasks</div>
          </div>
          
          <div className="col-span-2 bg-black-800/50 p-3 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-silver-100 tabular-nums">{status.efficiency}%</div>
                <div className="text-xs text-silver-300/60 mt-1">Operational Efficiency</div>
              </div>
              
              <div className="h-10 w-10 rounded-full border-[3px] border-redmetal-400 flex items-center justify-center">
                <span className="text-sm font-medium text-silver-100">A+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
