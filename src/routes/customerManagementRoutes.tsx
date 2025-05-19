
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import CustomerDashboard from "@/pages/customer-management/CustomerDashboard";
import CustomerDirectoryPage from "@/pages/customer-management/CustomerDirectoryPage";
import CustomerSettings from "@/pages/customer-management/CustomerSettings";
import NewCustomerPage from "@/pages/customer-management/NewCustomerPage";
import EditCustomerPage from "@/pages/customer-management/EditCustomerPage";
import { Users, Settings, BarChart3, FileUp, Home } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const customerNavCategories: NavCategory[] = [
  {
    name: "CUSTOMER MANAGEMENT",
    label: "CUSTOMER MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Home, path: '/customer-management' },
      { label: 'Customer Directory', icon: Users, path: '/customer-management/directory' },
      { label: 'Customer Settings', icon: Settings, path: '/customer-management/settings' },
      { label: 'Customer Analytics', icon: BarChart3, path: '/customer-analytics' },
      { label: 'Upload Files', icon: FileUp, path: '/data-management/uploads' }
    ]
  }
];

export const CustomerManagementRoutes = () => {
  return [
    <Route key="customer-management-index" path="/customer-management">
      <Route index element={
        <PlatformLayout
          moduleTitle="Customer Management"
          navCategories={customerNavCategories}
        >
          <CustomerDashboard />
        </PlatformLayout>
      } />
      <Route path="directory" element={
        <PlatformLayout
          moduleTitle="Customer Directory"
          navCategories={customerNavCategories}
        >
          <CustomerDirectoryPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Customer Settings"
          navCategories={customerNavCategories}
        >
          <CustomerSettings />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="New Customer"
          navCategories={customerNavCategories}
        >
          <NewCustomerPage />
        </PlatformLayout>
      } />
      <Route path=":id" element={
        <PlatformLayout
          moduleTitle="Edit Customer"
          navCategories={customerNavCategories}
        >
          <EditCustomerPage />
        </PlatformLayout>
      } />
    </Route>
  ];
};
