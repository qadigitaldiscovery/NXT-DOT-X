
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
  
  return (
    <Card className="border rounded-lg shadow-sm bg-white">      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{module.name}</CardTitle>
          <Badge className={getStatusColor(module.status)}>
            {getStatusText(module.status)}
          </Badge>
        </div>
        {module.description && (
          <CardDescription className="mt-1">
            {module.description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pb-0">
        <div className="flex items-center justify-between">
          <StatusGauge status={module.status} size="md" />
          
          {alertCount > 0 && (
            <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
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
          className="w-full flex items-center justify-between"
        >
          View Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
