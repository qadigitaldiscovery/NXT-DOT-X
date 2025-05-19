
import { Card } from "@/components/ui/card";
import { Bot, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommandoUnitProps {
  unit?: {
    id: string;
    name: string;
    status: 'active' | 'standby' | 'deployed';
    type: string;
    stats: {
      power: number;
      deployments: number;
      success: number;
    };
  };
  onDeploy?: (unitId: string) => void;
}

export const CommandoUnitCard = ({ 
  unit = {
    id: "ai-unit-1",
    name: "Sierra Alpha",
    status: "active" as const,
    type: "Intelligence Gathering",
    stats: {
      power: 85,
      deployments: 12,
      success: 98
    }
  },
  onDeploy 
}: CommandoUnitProps) => {
  return (
    <div className="frosted-card h-full">
      <div className="glossy-overlay" />
      
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Bot className="h-5 w-5 text-silver-300/70 mr-2" />
            <h3 className="text-silver-100 font-medium">{unit.name}</h3>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            unit.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
            unit.status === 'deployed' ? 'bg-redmetal-400/30 text-silver-300' : 
            'bg-amber-500/20 text-amber-300'
          }`}>
            {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
          </div>
        </div>
        
        <p className="text-silver-300/70 text-sm mb-4">{unit.type}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-black-800/50 p-2 rounded-lg text-center">
            <div className="text-xl font-bold text-redmetal-400 tabular-nums">{unit.stats.power}</div>
            <div className="text-xs text-silver-300/60">Power</div>
          </div>
          
          <div className="bg-black-800/50 p-2 rounded-lg text-center">
            <div className="text-xl font-bold text-silver-100 tabular-nums">{unit.stats.deployments}</div>
            <div className="text-xs text-silver-300/60">Ops</div>
          </div>
          
          <div className="bg-black-800/50 p-2 rounded-lg text-center">
            <div className="text-xl font-bold text-emerald-400 tabular-nums">{unit.stats.success}%</div>
            <div className="text-xs text-silver-300/60">Success</div>
          </div>
        </div>
        
        {onDeploy && unit.status !== 'deployed' && (
          <Button 
            onClick={() => onDeploy(unit.id)}
            className="w-full bg-redmetal-600 hover:bg-redmetal-400 text-silver-100 border border-silver-300/20"
            size="sm"
          >
            <Shield className="h-4 w-4 mr-2" /> Deploy Unit
          </Button>
        )}
      </div>
    </div>
  );
};
