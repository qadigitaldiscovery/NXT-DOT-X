
import { useState, useEffect } from 'react';

export interface ModuleAccess {
  id: string;
  module_slug: string;
  submenu_slug?: string | null;
  category?: string | null;
  is_enabled: boolean;
}

export interface UserRoleInfo {
  roles: string[];
  modules: ModuleAccess[];
  isAdmin: boolean;
  hasAccess: (moduleSlug: string, submenuSlug?: string) => boolean;
}

export function useModuleAccess(): {
  moduleAccess: UserRoleInfo | null;
  loading: boolean;
  error: Error | null;
  refreshAccess: () => Promise<void>;
  toggleModuleAccess: (id: string, isEnabled: boolean) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error] = useState<Error | null>(null);

  // Always return admin access with all modules enabled
  const moduleAccess: UserRoleInfo = {
    roles: ['admin'],
    modules: [],
    isAdmin: true,
    hasAccess: () => true // Always allow access
  };

  const refreshAccess = async () => {
    // No-op since security is disabled
  };

  const toggleModuleAccess = async (id: string, isEnabled: boolean) => {
    // No-op since security is disabled
  };

  return { moduleAccess, loading, error, refreshAccess, toggleModuleAccess };
}

// Always return true since security is disabled
export function isModuleEnabled(moduleSlug: string, userRoles?: string[]): boolean {
  return true;
}
