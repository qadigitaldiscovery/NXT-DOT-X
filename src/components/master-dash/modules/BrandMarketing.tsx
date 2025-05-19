
import { ModuleCard } from '../ModuleCard';

const BrandMarketing = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Brand Marketing"
        path="/brand-marketing"
        variant="default"
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
