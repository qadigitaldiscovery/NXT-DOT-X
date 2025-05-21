import { Suspense } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import DashboardV2 from '@/pages/DashboardV2';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';

export const SecureRoute = () => {
  const { hasRole } = usePermissions();
  return hasRole('admin') ? (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <PlatformLayout>
        <DashboardV2 />
      </PlatformLayout>
    </Suspense>
  ) : (
    <div className="p-6 text-red-600">Unauthorized</div>
  );
};
