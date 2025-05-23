
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const AdminModuleAccess = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <div className="mr-4 p-2 rounded-full bg-blue-100 dark:bg-blue-900">
          <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Module Access Control</h1>
          <p className="text-muted-foreground">
            All modules are available to all users (Security Disabled)
          </p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Security Status: Disabled</h3>
        <p className="text-green-700">
          All security restrictions have been removed. All users have access to all modules and features.
        </p>
      </div>
    </div>
  );
};

export default AdminModuleAccess;
