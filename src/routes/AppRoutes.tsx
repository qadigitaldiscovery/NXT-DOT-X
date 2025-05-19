
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { VendorRoutes } from "./vendorRoutes";
import { DataManagementRoutes } from "./dataManagementRoutes";
import { SupplierManagementRoutes } from "./supplierManagementRoutes";
import MasterDash from "@/pages/MasterDash";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Master Dashboard at root path */}
      <Route path="/" element={<MasterDash />} />
      <Route path="/master" element={<MasterDash />} />
      
      {/* All module routes */}
      {VendorRoutes()}
      {DataManagementRoutes()}
      {SupplierManagementRoutes()}
      
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
