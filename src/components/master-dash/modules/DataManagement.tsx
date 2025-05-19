
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';
import { Database, BarChart3 } from 'lucide-react';

const DataManagement = () => {
  const navigate = useNavigate();

  const dataModules = [
    {
      title: 'Data Management',
      icon: <Database className="h-8 w-8 text-blue-500" />,
      path: '/data-management',
    },
    {
      title: 'Cost Analysis',
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      path: '/data-management/cost-analysis',
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Data Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataModules.map((module, index) => (
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

export default DataManagement;
