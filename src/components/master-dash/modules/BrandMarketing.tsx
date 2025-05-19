
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';
import { Megaphone, TrendingUp } from 'lucide-react';

const BrandMarketing = () => {
  const navigate = useNavigate();

  const marketingModules = [
    {
      title: 'Campaign Analytics',
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      path: '/brand-marketing/campaigns',
    },
    {
      title: 'Brand Awareness',
      icon: <Megaphone className="h-8 w-8 text-orange-500" />,
      path: '/brand-marketing/awareness',
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Brand Marketing</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketingModules.map((module, index) => (
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

export default BrandMarketing;
