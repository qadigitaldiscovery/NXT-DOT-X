
import React from "react";
import { Route, Navigate } from "react-router-dom";
import VendorsPage from '@/pages/auto/VendorsPage';
import VendorDetailPage from '@/pages/vendors/VendorDetailPage';
import SupplierDirectoryPage from '@/pages/supplier-management/SupplierDirectoryPage';

// Supplier management routes now support both redirects and direct paths
export const SupplierManagementRoutes = () => {
  return [
    <Route key="supplier-management" path="/supplier-management">
      <Route index element={<Navigate to="/supplier-management/directory" replace />} />
      <Route path="directory" element={<SupplierDirectoryPage />} />
      <Route path="settings" element={<Navigate to="/data-management/suppliers/settings" replace />} />
      <Route path=":id" element={<VendorDetailPage />} />
      <Route path="new" element={<Navigate to="/data-management/suppliers/new" replace />} />
      <Route path="*" element={<Navigate to="/supplier-management/directory" replace />} />
    </Route>
  ];
};
