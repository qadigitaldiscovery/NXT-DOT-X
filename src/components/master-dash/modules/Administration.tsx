
import { ModuleCard } from '../ModuleCard';
import { Shield } from 'lucide-react';

const Administration = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Administration"
        icon={<Shield className="h-8 w-8" />}
        path="/admin"
        variant="default"
        features={[
          { name: 'User Management', path: '/admin/users' },
          { name: 'Security Controls', path: '/admin/security' },
          { name: 'Module Access', path: '/admin/module-access' },
          { name: 'Database Admin', path: '/admin/database' }
        ]}
      />
    </div>
  );
};

export default Administration;
