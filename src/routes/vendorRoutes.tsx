
import React from "react";
import { Route } from "react-router-dom";
import VendorsPage from "@/pages/auto/VendorsPage";
import VendorDetailPage from "@/pages/vendors/VendorDetailPage";

export const VendorRoutes = () => {
  return (
    <>
      <Route path="/vendors">
        <Route index element={<VendorsPage />} />
        <Route path=":vendorId" element={<VendorDetailPage />} />
      </Route>
    </>
  );
};
