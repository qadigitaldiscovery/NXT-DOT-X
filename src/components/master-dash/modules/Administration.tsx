
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../ModuleCard';
import { Shield, Users } from 'lucide-react';

const Administration = () => {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: 'User Management',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      path: '/admin/users',
    },
    {
      title: 'Security Controls',
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      path: '/admin/security',
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
          />
        ))}
      </div>
    </div>
  );
};

export default Administration;
