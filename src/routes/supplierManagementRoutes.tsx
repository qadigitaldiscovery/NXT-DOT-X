
import { Route } from "react-router-dom";
import SupplierSettings from "@/pages/supplier-management/SupplierSettings";
import { SupplierManagementLayout } from "@/components/layout/SupplierManagementLayout";
import SupplierDirectoryPage from "@/pages/supplier-management/SupplierDirectoryPage";
import SupplierDashboard from "@/pages/supplier-management/SupplierDashboard";

export const SupplierManagementRoutes = () => {
  return (
    <Route path="/supplier-management" element={<SupplierManagementLayout />}>
      <Route index element={<SupplierDashboard />} />
      <Route path="directory" element={<SupplierDirectoryPage />} />
      <Route path="settings" element={<SupplierSettings />} />
    </Route>
  );
};
