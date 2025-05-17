import { Route } from "react-router-dom";
import VendorsPage from "@/pages/auto/VendorsPage";
import { Building2, FileText, ListFilter, Users, Plus } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';
import VendorDetail from '@/pages/vendors/VendorDetail';
import NewVendorPage from '@/pages/vendors/NewVendorPage';
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';

export const VendorNavCategories: NavCategory[] = [
  {
    name: "Vendors",
    label: "Vendors",
    items: [
      { label: "Dashboard", path: "/vendors", icon: Building2 },
      { label: "Directory", path: "/vendors/directory", icon: ListFilter },
      { label: "Add New Vendor", path: "/vendors/new", icon: Plus },
      { label: "Reports", path: "/vendors/reports", icon: FileText },
      { label: "Vendor Contacts", path: "/vendors/contacts", icon: Users }
    ]
  }
];

export const VendorRoutes = () => {
  return (
    <Route path="/vendors" element={<TradingSystemLayout />}>
      <Route index element={<VendorsPage />} />
      <Route path=":id" element={<VendorDetail />} />
      <Route path="new" element={<NewVendorPage />} />
      <Route path="directory" element={<VendorsPage />} />
      <Route path="reports" element={<VendorsPage />} />
      <Route path="contacts" element={<VendorsPage />} />
    </Route>
  );
};
