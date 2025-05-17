import { Route, Navigate } from "react-router-dom";
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';

// Note: The vendorRoutes are now redirected to the unified Supplier Vendors module
export const VendorRoutes = () => {
  return (
    <Route path="/vendors">
      <Route index element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path=":id" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="new" element={<Navigate to="/data-management/supplier-vendors/new" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="reports" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="contacts" element={<Navigate to="/data-management/supplier-vendors" replace />} />
    </Route>
  );
};
