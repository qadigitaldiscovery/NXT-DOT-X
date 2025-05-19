
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type Module } from '@/hooks/useModules';
import StatusGauge from './StatusGauge';

interface ModuleCardProps {
  module: Module;
  alertCount: number;
  onViewDetails: (module: Module) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, alertCount, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'green': return 'Operational';
      case 'orange': return 'Degraded';
      case 'red': return 'Outage';
      default: return 'Unknown';
    }
  };
  
  const getBackgroundGradient = (status: string) => {
    switch (status) {
      case 'green': return 'from-redmetal-600 to-black';
      case 'orange': return 'from-redmetal-600 to-black';
      case 'red': return 'from-redmetal-600 to-black';
      default: return 'from-redmetal-600 to-black';
    }
  };
  
  return (
    <Card className="relative shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden border border-gray-700">
      {/* Background gradient based on status */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(module.status)} z-0`}
      />
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{ 
          backgroundImage: "url('/lovable-uploads/f591cd6e-de49-44cf-bfb9-207fcd31b3ce.png')",
          backgroundSize: "cover",
        }}
      />
      
      {/* Neon blue splash */}
      <div 
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)",
        }}
      />
      
      <div className="relative z-10 text-white">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{module.name}</CardTitle>
            <Badge className={getStatusColor(module.status)}>
              {getStatusText(module.status)}
            </Badge>
          </div>
          {module.description && (
            <CardDescription className="mt-1 text-gray-300">
              {module.description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="pb-0">
          <div className="flex items-center justify-between">
            <StatusGauge status={module.status} size="md" />
            
            {alertCount > 0 && (
              <div className="flex items-center text-amber-300 bg-amber-900/30 px-3 py-1 rounded-full">
                <AlertTriangle className="mr-1 h-4 w-4" />
                <span className="text-sm font-medium">{alertCount} alert{alertCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-4">
          <Button 
            variant="outline" 
            onClick={() => onViewDetails(module)}
            className="w-full flex items-center justify-between border-gray-600 bg-black/30 hover:bg-black/50 text-white"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ModuleCard;
