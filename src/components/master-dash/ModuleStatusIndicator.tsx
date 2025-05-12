
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

// Define a type for the status of a module
type ModuleStatus = 'operational' | 'degraded' | 'outage';

// Define a type for each module's status information
interface ModuleStatusInfo {
  name: string;
  status: ModuleStatus;
  lastUpdated: string; // ISO date string
  description?: string;
}

const getStatusColor = (status: ModuleStatus) => {
  switch (status) {
    case 'operational':
      return 'bg-green-500';
    case 'degraded':
      return 'bg-amber-500';
    case 'outage':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: ModuleStatus) => {
  switch (status) {
    case 'operational':
      return 'Operational';
    case 'degraded':
      return 'Degraded Performance';
    case 'outage':
      return 'Service Outage';
    default:
      return 'Unknown';
  }
};

// Mock data for module statuses - this would come from an API in a real app
const moduleStatuses: ModuleStatusInfo[] = [
  { name: 'Data Management', status: 'operational', lastUpdated: '2025-05-12T08:30:00Z' },
  { name: 'Loyalty Program', status: 'operational', lastUpdated: '2025-05-12T08:45:00Z' },
  { name: 'Trading System', status: 'degraded', lastUpdated: '2025-05-12T07:15:00Z', description: 'Experiencing delays in market data' },
  { name: 'Social Media Marketing', status: 'operational', lastUpdated: '2025-05-12T08:00:00Z' },
  { name: 'Tech Hub', status: 'operational', lastUpdated: '2025-05-12T08:50:00Z' },
  { name: 'DOT-X', status: 'operational', lastUpdated: '2025-05-12T09:00:00Z' },
  { name: 'Brand Marketing', status: 'operational', lastUpdated: '2025-05-12T08:20:00Z' },
];

const ModuleStatusIndicator: React.FC = () => {
  return (
    <Card className="bg-slate-900/80 border-slate-800 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <span>Module Status</span>
          <Link to="/dashboard/rag">
            <Button variant="link" size="sm" className="text-blue-300 hover:text-blue-200 p-0">
              View Full Dashboard
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {moduleStatuses.map((moduleStatus) => (
            <div key={moduleStatus.name} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-md">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(moduleStatus.status)}`}></div>
              <div>
                <div className="text-sm text-white font-medium">{moduleStatus.name}</div>
                <div className="text-xs text-slate-400">{getStatusText(moduleStatus.status)}</div>
                {moduleStatus.description && <div className="text-xs text-slate-500 mt-1">{moduleStatus.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-3">
        <Link to="/dashboard/rag" className="w-full">
          <Button className="w-full bg-indigo-700 hover:bg-indigo-600 flex items-center justify-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Detailed Status Dashboard
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleStatusIndicator;
