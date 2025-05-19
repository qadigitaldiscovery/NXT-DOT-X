
import { ModuleCard } from '../ModuleCard';
import { Share2 } from 'lucide-react';

const SocialMediaMarketing = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Social Media Marketing"
        icon={<Share2 className="h-8 w-8" />}
        path="/social-media"
        variant="default"
        features={[
          { name: 'Social Dashboard', path: '/social-media' },
          { name: 'Account Management', path: '/social-media/accounts' },
          { name: 'Content Calendar', path: '/social-media/calendar' },
          { name: 'Engagement Analytics', path: '/social-media/engagement' },
          { name: 'Social Settings', path: '/social-media/settings' }
        ]}
      />
    </div>
  );
};

export default SocialMediaMarketing;
