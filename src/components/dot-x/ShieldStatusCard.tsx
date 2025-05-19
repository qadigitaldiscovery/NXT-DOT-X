
import { Card } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface ShieldStatusProps {
  status?: {
    level: number;
    change: number;
    description: string;
  };
  onUpgrade?: () => void;
}

export const ShieldStatusCard = ({ status = { level: 1248, change: 3.51, description: "Current balance" }, onUpgrade }: ShieldStatusProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0 rounded-3xl border-0 shadow-lg">
      <div className="p-6 relative">
        {/* Top indicator with arrow and percentage */}
        <div className="flex justify-between mb-4">
          <div className="bg-slate-800/70 rounded-full p-2">
            <ArrowUp className="h-4 w-4 text-gray-300" />
          </div>
          <span className="text-emerald-400 font-medium">
            +{status.change}%
          </span>
        </div>
        
        {/* Main value */}
        <div className="mt-4">
          <div className="flex items-end">
            <span className="text-4xl font-bold tracking-tight">
              $ {status.level.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-400 mt-1">{status.description}</p>
        </div>
      </div>
    </Card>
  );
};
