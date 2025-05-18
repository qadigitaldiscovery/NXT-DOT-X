
import React from 'react';
import ModuleCard from '../ModuleCard';
import { useNavigate } from 'react-router-dom';
import { Shield, Users } from 'lucide-react';

const Administration = () => {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      path: '/admin/users',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'Security Controls',
      description: 'Manage security policies and access control',
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      path: '/admin/security',
      onClick: () => navigate('/admin/security')
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Administration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
            onClick={module.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Administration;
