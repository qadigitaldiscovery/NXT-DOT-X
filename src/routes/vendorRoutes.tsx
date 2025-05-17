
import { Route, Navigate, useParams } from "react-router-dom";
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';
import VendorDetailPage from "@/pages/vendors/VendorDetailPage";
import VendorsPage from "@/pages/auto/VendorsPage";

// Wrapper component to handle the ID parameter
const VendorRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/data-management/suppliers?id=${id}`} replace />;
};

// Note: The vendor routes now include direct paths to tabs
export const VendorRoutes = () => {
  return (
    <Route path="/vendors">
      <Route index element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path=":id" element={<VendorDetailPage />} />
      <Route path=":id/data" element={<VendorDetailPage defaultTab="data" />} />
      <Route path=":id/market-iq" element={<VendorDetailPage defaultTab="market-iq" />} />
      <Route path=":id/contracts" element={<VendorDetailPage defaultTab="contracts" />} />
      <Route path=":id/events" element={<VendorDetailPage defaultTab="events" />} />
      <Route path=":id/messages" element={<VendorDetailPage defaultTab="messages" />} />
      <Route path=":id/files" element={<VendorDetailPage defaultTab="files" />} />
      <Route path=":id/forms" element={<VendorDetailPage defaultTab="forms" />} />
      <Route path=":id/users" element={<VendorDetailPage defaultTab="users" />} />
      <Route path=":id/track" element={<VendorDetailPage defaultTab="track" />} />
      <Route path=":id/risk" element={<VendorDetailPage defaultTab="risk" />} />
      <Route path=":id/spend" element={<VendorDetailPage defaultTab="spend" />} />
      <Route path="new" element={<Navigate to="/data-management/suppliers/new" replace />} />
      <Route path="directory" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="reports" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="contacts" element={<Navigate to="/data-management/suppliers" replace />} />
    </Route>
  );
};
