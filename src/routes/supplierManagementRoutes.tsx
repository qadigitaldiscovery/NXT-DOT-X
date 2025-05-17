import { Route, Navigate } from "react-router-dom";

// All supplier management routes now redirect to the unified Supplier Vendors page
export const SupplierManagementRoutes = () => {
  return (
    <Route path="/supplier-management">
      <Route index element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="settings" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="*" element={<Navigate to="/data-management/supplier-vendors" replace />} />
    </Route>
  );
};
