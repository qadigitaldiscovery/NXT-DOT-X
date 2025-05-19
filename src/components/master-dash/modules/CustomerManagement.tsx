
import { ModuleCard } from '../ModuleCard';
import { Users } from 'lucide-react';

const CustomerManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Customer Management"
        icon={<Users className="h-8 w-8" />}
        path="/customer-management"
        variant="default"
        features={[
          { name: 'Customer Directory', path: '/customer-management' },
          { name: 'Interaction History', path: '/customer-management/history' },
          { name: 'Customer Analytics', path: '/customer-management/analytics' },
          { name: 'Customer Settings', path: '/customer-management/settings' }
        ]}
      />
    </div>
  );
};

export default CustomerManagement;
