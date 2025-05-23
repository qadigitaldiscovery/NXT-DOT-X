
import React from 'react';
import { Target } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const BrandMarketing = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Brand Marketing"
      description="Brand management, market perception, and SEO optimization"
      icon={<Target size={24} />}
      features={[
        { name: 'Brand Analytics', path: '/brand/analytics' },
        { name: 'Market Perception', path: '/brand/perception' },
        { name: 'SEO Management', path: '/brand/seo' },
        { name: 'Brand Trust', path: '/brand/trust' }
      ]}
      onClick={() => navigate('/brand-marketing')}
    />
  );
};

export default BrandMarketing;
