
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
    <ModuleStatusFilter
      selectedStatus={selectedStatus}
      onStatusSelect={onStatusSelect}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
    />
  );
};

export default DashboardFilters;
