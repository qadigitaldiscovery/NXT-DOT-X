
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../ModuleCard';
import { Users } from 'lucide-react';

const CustomerManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="col-span-1">
      <ModuleCard
        title="CUSTOMER MANAGEMENT"
        path="/customer-management"
        variant="default"
        features={[
          { name: 'Customer Directory', path: '/customer-management/directory' },
          { name: 'Add New Customer', path: '/customer-management/new' },
          { name: 'Interaction History', path: '/customer-management/history' },
          { name: 'Customer Analytics', path: '/customer-management/analytics' }
        ]}
      />
    </div>
  );
};

export default CustomerManagement;
