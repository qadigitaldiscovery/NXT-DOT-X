import { Route, Navigate, useParams } from "react-router-dom";
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';

// Wrapper component to handle the ID parameter
const VendorRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/data-management/supplier-vendors?id=${id}&type=vendor`} replace />;
};

// Note: The vendorRoutes are now redirected to the unified Supplier Vendors module
export const VendorRoutes = () => {
  return (
    <Route path="/vendors">
      <Route index element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path=":id" element={<VendorRedirect />} />
      <Route path="new" element={<Navigate to="/data-management/supplier-vendors/new" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="reports" element={<Navigate to="/data-management/supplier-vendors" replace />} />
      <Route path="contacts" element={<Navigate to="/data-management/supplier-vendors" replace />} />
    </Route>
  );
};
