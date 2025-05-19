
import { useState, useMemo, useEffect } from 'react';
import { Module } from '@/hooks/useModules';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from '@/context/AuthContext';

export const useDashboardState = (modules: Module[], alerts: any[]) => {
  const { user } = useAuth();
  
  // Get preferences from database with fallback to local state
  const { preferences, setPreferences } = useUserPreferences({
    module: 'rag_dashboard',
    key: 'filters',
    defaultValue: {
      selectedStatus: null,
      searchQuery: '',
    }
  });
  
  // Local state for UI
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    (preferences as any)?.selectedStatus || null
  );
  
  const [searchQuery, setSearchQuery] = useState<string>(
    (preferences as any)?.searchQuery || ''
  );
  
  // State for module details dialog
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // State for batch operations dialog
  const [isBatchOperationsOpen, setIsBatchOperationsOpen] = useState(false);
  
  // Save preferences when filter state changes
  useEffect(() => {
    if (user) {
      setPreferences({
        selectedStatus,
        searchQuery
      });
    }
  }, [selectedStatus, searchQuery, user, setPreferences]);
  
  // Filter modules based on selected status and search query
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      // Filter by status if selected
      if (selectedStatus && module.status !== selectedStatus) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !module.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [modules, selectedStatus, searchQuery]);
  
  // Count alerts by module
  const alertCountByModule = useMemo(() => {
    const counts: Record<string, number> = {};
    
    alerts.forEach(alert => {
      if (!alert.resolved) {
        counts[alert.module_id] = (counts[alert.module_id] || 0) + 1;
      }
    });
    
    return counts;
  }, [alerts]);

  // Set status handler with persistence
  const setSelectedStatusWithPersistence = (status: string | null) => {
    setSelectedStatus(status);
    if (user) {
      setPreferences({
        selectedStatus: status,
        searchQuery
      });
    }
  };
  
  // Set search handler with persistence
  const setSearchQueryWithPersistence = (query: string) => {
    setSearchQuery(query);
    if (user) {
      setPreferences({
        selectedStatus,
        searchQuery: query
      });
    }
  };

  const handleViewDetails = (module: Module) => {
    setSelectedModule(module);
    setIsDetailsOpen(true);
  };

  return {
    // State
    selectedStatus,
    setSelectedStatus: setSelectedStatusWithPersistence,
    searchQuery,
    setSearchQuery: setSearchQueryWithPersistence,
    selectedModule,
    setSelectedModule,
    isDetailsOpen,
    setIsDetailsOpen,
    isBatchOperationsOpen,
    setIsBatchOperationsOpen,
    
    // Computed values
    filteredModules,
    alertCountByModule,

    // Actions
    handleViewDetails
  };
};
