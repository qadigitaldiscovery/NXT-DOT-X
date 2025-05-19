
import { ModuleCard } from '../ModuleCard';
import { MessageSquare } from 'lucide-react';

const Communications = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Communications"
        icon={<MessageSquare className="h-8 w-8" />}
        path="/communications"
        variant="default"
        features={[
          { name: 'Email Campaigns', path: '/communications/email' },
          { name: 'Messaging Center', path: '/communications/messaging' },
          { name: 'Contact Management', path: '/communications/contacts' },
          { name: 'Templates', path: '/communications/templates' },
          { name: 'Analytics', path: '/communications/analytics' }
        ]}
      />
    </div>
  );
};

export default Communications;
