
import { ModuleCard } from '../ModuleCard';
import { Megaphone, TrendingUp } from 'lucide-react';

const BrandMarketing = () => {
  const marketingModules = [
    {
      title: 'Campaign Analytics',
      icon: <TrendingUp className="h-7 w-7 text-orange-500" />,
      path: '/brand-marketing/campaigns',
      color: "bg-gradient-to-br from-orange-50 to-orange-100"
    },
    {
      title: 'Brand Awareness',
      icon: <Megaphone className="h-7 w-7 text-orange-500" />,
      path: '/brand-marketing/awareness',
      color: "bg-gradient-to-br from-amber-50 to-amber-100"
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
            color={module.color}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandMarketing;
