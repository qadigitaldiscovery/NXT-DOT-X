
import { ModuleCard } from '../ModuleCard';

const Administration = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Administration"
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
