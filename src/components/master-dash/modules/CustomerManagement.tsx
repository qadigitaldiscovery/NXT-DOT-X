
import { ModuleCard } from '../ModuleCard';

const CustomerManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Customer Management"
        path="/customer-management"
        variant="default"
        features={[
          { name: 'Customer Directory', path: '/customer-management/directory' },
          { name: 'Interaction History', path: '/customer-management/history' },
          { name: 'Customer Analytics', path: '/customer-management/analytics' },
          { name: 'Customer Settings', path: '/customer-management/settings' }
        ]}
      />
    </div>
  );
};

export default CustomerManagement;
