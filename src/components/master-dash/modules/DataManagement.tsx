
import ModuleCard from '../ModuleCard';
import { useNavigate } from 'react-router-dom';
import { Database, BarChart3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DataManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const dataModules = [
    {
      title: 'Data Management',
      description: 'Centralized data hub for suppliers, customers, and pricing',
      icon: <Database className="h-8 w-8 text-blue-500" />,
      onClick: () => navigate('/data-management')
    },
    {
      title: 'Cost Analysis',
      description: 'Analyze cost trends, supplier comparisons, and category variations',
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      onClick: () => navigate('/data-management/cost-analysis')
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
            description={module.description}
            icon={module.icon}
            onClick={module.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DataManagement;
