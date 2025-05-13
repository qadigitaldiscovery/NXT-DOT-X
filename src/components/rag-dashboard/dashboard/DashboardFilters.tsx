
import React from 'react';
import ModuleStatusFilter from '@/components/rag-dashboard/ModuleStatusFilter';

interface DashboardFiltersProps {
  selectedStatus: string | null;
  onStatusSelect: (status: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedStatus,
  onStatusSelect,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">System Modules</h2>
      <ModuleStatusFilter
        selectedStatus={selectedStatus}
        onStatusSelect={onStatusSelect}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default DashboardFilters;
