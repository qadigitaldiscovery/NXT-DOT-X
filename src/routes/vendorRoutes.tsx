
import React from "react";
import { Route } from "react-router-dom";
import VendorsPage from "@/pages/auto/VendorsPage";
import VendorDetailPage from "@/pages/vendors/VendorDetailPage";

export const VendorRoutes = () => {
  return [
    <Route key="vendors-index" path="/vendors" element={<VendorsPage />} />,
    <Route key="vendor-detail" path="/vendors/:vendorId" element={<VendorDetailPage />} />
  ];
};
