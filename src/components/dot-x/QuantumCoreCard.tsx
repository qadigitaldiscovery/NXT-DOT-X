
import { Card } from "@/components/ui/card";
import { Progress } from "lucide-react";

interface QuantumCoreProps {
  core?: {
    progress: number;
    days: number[];
  };
}

export const QuantumCoreCard = ({ 
  core = { 
    progress: 64, 
    days: [35, 41, 45, 64, 38, 43, 52, 42, 38, 45] 
  } 
}: QuantumCoreProps) => {
  // Find the index of the highest value (for highlighting)
  const highestIndex = core.days.indexOf(Math.max(...core.days));
  
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0 rounded-3xl border-0 shadow-lg">
      <div className="p-6">
        <h3 className="text-gray-300 mb-2 font-medium">Progress</h3>
        
        {/* Progress indicator pill */}
        <div className="relative my-6">
          <div className="absolute w-full h-px bg-slate-700/50 top-1/2 -translate-y-1/2"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white text-slate-900 rounded-full px-3 py-1 text-xs font-medium">
            {core.progress}%
          </div>
        </div>
        
        {/* Bar chart */}
        <div className="mt-8 flex items-end justify-between h-24">
          {core.days.map((value, index) => {
            const dayNumber = index + 11; // Starting from day 11
            const height = `${value}%`;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-3 rounded-full ${index === highestIndex ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                  style={{ height }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{dayNumber}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
