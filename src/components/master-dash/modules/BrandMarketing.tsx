
import React from 'react';
import { Target } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const BrandMarketing = () => {
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
      onClick={() => window.location.href = '/brand-marketing'}
    />
  );
};

export default BrandMarketing;
