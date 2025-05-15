import React from 'react';
import { Module } from '@/hooks/useModules';
import ModuleCard from '@/components/rag-dashboard/ModuleCard';

interface ModulesGridProps {
  modules: Module[];
  isLoading: boolean;
  hasError: boolean;
  alertCountByModule: Record<string, number>;
  onViewDetails: (module: Module) => void;
}

// Export as a named constant to match import in RAGDashboardPage
export const ModulesGrid: React.FC<ModulesGridProps> = ({ 
  modules, 
  isLoading, 
  hasError, 
  alertCountByModule, 
  onViewDetails 
}) => {
  if (isLoading) {
    return <div className="py-8 text-center">Loading modules...</div>;
  }
  
  if (hasError) {
    return (
      <div className="py-8 text-center text-red-500">
        Error loading modules. Please refresh and try again.
      </div>
    );
  }
  
  if (modules.length === 0) {
    return <div className="py-8 text-center">No modules match the current filters.</div>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          alertCount={alertCountByModule[module.id] || 0}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

// Keep default export for backward compatibility
export default ModulesGrid;
