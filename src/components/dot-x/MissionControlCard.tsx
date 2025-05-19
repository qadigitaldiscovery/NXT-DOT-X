
import { Card } from "@/components/ui/card";
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
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0 rounded-3xl border-0 shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-300 font-medium">Mission Status</h3>
          <Activity className="h-5 w-5 text-blue-400" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-800/50 p-3 rounded-xl">
            <div className="text-2xl font-bold">{status.activeOperations}</div>
            <div className="text-xs text-gray-400 mt-1">Active</div>
          </div>
          
          <div className="bg-slate-800/50 p-3 rounded-xl">
            <div className="text-2xl font-bold">{status.completedTasks}</div>
            <div className="text-xs text-gray-400 mt-1">Completed</div>
          </div>
          
          <div className="col-span-2 bg-slate-800/50 p-3 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{status.efficiency}%</div>
                <div className="text-xs text-gray-400 mt-1">Efficiency</div>
              </div>
              
              <div className="h-10 w-10 rounded-full border-[3px] border-blue-500 flex items-center justify-center">
                <span className="text-sm font-medium">A+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
