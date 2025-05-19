
import React from 'react';
import { ModuleCard } from '../ModuleCard';
import { Megaphone } from 'lucide-react';

const BrandMarketing = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Brand Marketing"
        icon={<Megaphone className="h-8 w-8" />}
        path="/brand-marketing"
        variant="red"
        features={[
          { name: 'Campaign Analytics', path: '/brand-marketing/campaigns' },
          { name: 'Brand Awareness', path: '/brand-marketing/awareness' },
          { name: 'Market Perception', path: '/brand-marketing/perception' },
          { name: 'SEO Keywords', path: '/brand-marketing/seo' }
        ]}
      />
    </div>
  );
};

export default BrandMarketing;
