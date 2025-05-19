
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
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0 rounded-3xl border-0 shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Bot className="h-5 w-5 text-blue-400 mr-2" />
            <h3 className="text-white font-medium">{unit.name}</h3>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            unit.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
            unit.status === 'deployed' ? 'bg-blue-500/20 text-blue-400' : 
            'bg-amber-500/20 text-amber-300'
          }`}>
            {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{unit.type}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-800/50 p-2 rounded-lg text-center">
            <div className="text-xl font-bold text-blue-400">{unit.stats.power}</div>
            <div className="text-xs text-gray-400">Power</div>
          </div>
          
          <div className="bg-slate-800/50 p-2 rounded-lg text-center">
            <div className="text-xl font-bold">{unit.stats.deployments}</div>
            <div className="text-xs text-gray-400">Ops</div>
          </div>
          
          <div className="bg-slate-800/50 p-2 rounded-lg text-center">
            <div className="text-xl font-bold text-emerald-400">{unit.stats.success}%</div>
            <div className="text-xs text-gray-400">Success</div>
          </div>
        </div>
        
        {onDeploy && unit.status !== 'deployed' && (
          <Button 
            onClick={() => onDeploy(unit.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Shield className="h-4 w-4 mr-2" /> Deploy Unit
          </Button>
        )}
      </div>
    </Card>
  );
};
