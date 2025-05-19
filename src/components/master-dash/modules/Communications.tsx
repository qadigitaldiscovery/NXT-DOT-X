
import { ModuleCard } from '../ModuleCard';

const Communications = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="COMMUNICATIONS"
        path="/communications"
        variant="default"
        features={[
          { name: 'Email Campaigns', path: '/communications/email' },
          { name: 'SMS Messaging', path: '/communications/sms' },
          { name: 'Notifications', path: '/communications/notifications' },
          { name: 'Templates', path: '/communications/templates' }
        ]}
      />
    </div>
  );
};

export default Communications;
