
import React from 'react';
import { ModuleCard } from '../ModuleCard';
import { Shield, Users } from 'lucide-react';

const Administration = () => {
  const adminModules = [
    {
      title: 'User Management',
      icon: <Users className="h-7 w-7 text-indigo-500" />,
      path: '/admin/users',
      variant: "dark" as const
    },
    {
      title: 'Security Controls',
      icon: <Shield className="h-7 w-7 text-blue-500" />,
      path: '/admin/security',
      variant: "dark" as const
    }
  ];

  return (
    <div className="col-span-1">
      <ModuleCard
        title="Administration"
        icon={<Shield className="h-8 w-8" />}
        path="/admin"
        variant="red"
        features={[
          { name: 'User Management', path: '/admin/users' },
          { name: 'Security Controls', path: '/admin/security' },
          { name: 'Module Access', path: '/admin/module-access' },
          { name: 'Database Admin', path: '/admin/database' }
        ]}
      />
    </div>
  );
};

export default Administration;
