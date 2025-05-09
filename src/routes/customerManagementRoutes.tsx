
import { Route } from "react-router-dom";
import { CustomerManagementLayout } from "@/components/layout/CustomerManagementLayout";
import CustomerDashboard from "@/pages/customer-management/CustomerDashboard";
import CustomerDirectoryPage from "@/pages/customer-management/CustomerDirectoryPage";
import CustomerSettings from "@/pages/customer-management/CustomerSettings";
import NewCustomerPage from "@/pages/customer-management/NewCustomerPage";
import EditCustomerPage from "@/pages/customer-management/EditCustomerPage";

export const CustomerManagementRoutes = () => {
  return (
    <Route path="/customer-management" element={<CustomerManagementLayout />}>
      <Route index element={<CustomerDashboard />} />
      <Route path="directory" element={<CustomerDirectoryPage />} />
      <Route path="settings" element={<CustomerSettings />} />
      <Route path="new" element={<NewCustomerPage />} />
      <Route path=":id" element={<EditCustomerPage />} />
    </Route>
  );
};
