
import { ModuleCard } from '../ModuleCard';
import { Shield, Users } from 'lucide-react';

const Administration = () => {
  const adminModules = [
    {
      title: 'User Management',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      path: '/admin/users',
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100"
    },
    {
      title: 'Security Controls',
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      path: '/admin/security',
      color: "bg-gradient-to-br from-blue-50 to-blue-100"
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
            icon={module.icon}
            path={module.path}
            color={module.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Administration;
