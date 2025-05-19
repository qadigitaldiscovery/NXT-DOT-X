
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ModuleTogglePanel from '@/components/admin/ModuleTogglePanel';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { ShieldCheck } from 'lucide-react';

const AdminModuleAccess = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <PermissionGuard requiredRole="admin">
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <div className="mr-4 p-2 rounded-full bg-blue-100 dark:bg-blue-900">
            <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Module Access Control</h1>
            <p className="text-muted-foreground">
              Manage user access permissions to modules and features
            </p>
          </div>
        </div>

        <ModuleTogglePanel userId={user.id} />
      </div>
    </PermissionGuard>
  );
};

export default AdminModuleAccess;
