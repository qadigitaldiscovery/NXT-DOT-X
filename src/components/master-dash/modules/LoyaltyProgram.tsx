
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../ModuleCard';
import { Gem, Award } from 'lucide-react';

const LoyaltyProgram = () => {
  const navigate = useNavigate();

  const loyaltyModules = [
    {
      title: 'Loyalty Dashboard',
      icon: <Gem className="h-8 w-8 text-emerald-500" />,
      path: '/loyalty/dashboard',
    },
    {
      title: 'Rewards Management',
      icon: <Award className="h-8 w-8 text-emerald-500" />,
      path: '/loyalty/rewards',
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Loyalty Program</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loyaltyModules.map((module, index) => (
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

export default LoyaltyProgram;
