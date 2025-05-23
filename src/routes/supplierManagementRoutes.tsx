
import { Route, Navigate } from "react-router-dom";
import VendorsPage from '@/pages/auto/VendorsPage';
import VendorDetailPage from '@/pages/vendors/VendorDetailPage';

// Supplier management routes now support both redirects and direct paths
export const SupplierManagementRoutes = () => {
  return (
    <Route path="/supplier-management">
      <Route index element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="settings" element={<Navigate to="/data-management/suppliers/settings" replace />} />
      <Route path=":id" element={<VendorDetailPage />} />
      <Route path="*" element={<Navigate to="/data-management/suppliers" replace />} />
    </Route>
  );
};
