import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';
import { Megaphone, TrendingUp } from 'lucide-react';

const BrandMarketing = () => {
  const navigate = useNavigate();

  const marketingModules = [
    {
      title: 'Campaign Analytics',
      description: 'Track and analyze the performance of your brand marketing campaigns.',
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      onClick: () => navigate('/brand-marketing/campaigns')
    },
    {
      title: 'Brand Awareness',
      description: 'Enhance brand visibility and recognition through strategic marketing initiatives.',
      icon: <Megaphone className="h-8 w-8 text-orange-500" />,
      onClick: () => navigate('/brand-marketing/awareness')
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
            description={module.description}
            icon={module.icon}
            onClick={module.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandMarketing;
