
import { ModuleCard } from '../ModuleCard';
import { Truck } from 'lucide-react';

const SupplierManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Supplier Management"
        icon={<Truck className="h-8 w-8" />}
        path="/supplier-management"
        variant="default"
        features={[
          { name: 'Supplier Directory', path: '/supplier-management' },
          { name: 'Performance Tracking', path: '/supplier-management/performance' },
          { name: 'Contract Management', path: '/supplier-management/contracts' },
          { name: 'Supplier Settings', path: '/supplier-management/settings' }
        ]}
      />
    </div>
  );
};

export default SupplierManagement;
