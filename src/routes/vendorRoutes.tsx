import { Route, Navigate, useParams } from "react-router-dom";
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';

// Wrapper component to handle the ID parameter
const VendorRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/data-management/suppliers?id=${id}`} replace />;
};

// Note: The vendor routes are now redirected to the unified Suppliers module
export const VendorRoutes = () => {
  return (
    <Route path="/vendors">
      <Route index element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path=":id" element={<VendorRedirect />} />
      <Route path="new" element={<Navigate to="/data-management/suppliers/new" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="reports" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="contacts" element={<Navigate to="/data-management/suppliers" replace />} />
    </Route>
  );
};
