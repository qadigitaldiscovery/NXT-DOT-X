import { Route, Navigate } from "react-router-dom";

// All supplier management routes now redirect to the unified Suppliers page
export const SupplierManagementRoutes = () => {
  return (
    <Route path="/supplier-management">
      <Route index element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="settings" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="*" element={<Navigate to="/data-management/suppliers" replace />} />
    </Route>
  );
};
