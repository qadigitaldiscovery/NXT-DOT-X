
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, AlertCircle } from "lucide-react";
import { useModules, type Module } from '@/hooks/useModules';

// Define a type for the status of a module
type ModuleStatus = 'green' | 'orange' | 'red';

const getStatusColor = (status: ModuleStatus) => {
  switch (status) {
    case 'green':
      return 'bg-green-500';
    case 'orange':
      return 'bg-amber-500';
    case 'red':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: ModuleStatus) => {
  switch (status) {
    case 'green':
      return 'Operational';
    case 'orange':
      return 'Degraded Performance';
    case 'red':
      return 'Service Outage';
    default:
      return 'Unknown';
  }
};

const ModuleStatusIndicator: React.FC = () => {
  const { modules, loading, error } = useModules();

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
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-pulse text-slate-400">Loading module status...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 py-6 text-red-400">
            <AlertCircle size={16} />
            <span>Error loading module statuses</span>
          </div>
        ) : modules.length === 0 ? (
          <div className="py-6 text-center text-slate-400">No module status information available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((moduleStatus) => (
              <div key={moduleStatus.id} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-md">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(moduleStatus.status)}`}></div>
                <div>
                  <div className="text-sm text-white font-medium">{moduleStatus.name}</div>
                  <div className="text-xs text-slate-400">{getStatusText(moduleStatus.status)}</div>
                  {moduleStatus.description && (
                    <div className="text-xs text-slate-500 mt-1">{moduleStatus.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
