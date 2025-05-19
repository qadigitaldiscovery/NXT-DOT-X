
import React from "react";
import { Route } from "react-router-dom";
import Beta1Dashboard from "@/pages/Beta1Dashboard";
import Beta2Dashboard from "@/pages/Beta2Dashboard";
import Beta2Analytics from "@/pages/Beta2Analytics";
import ModuleAutoPage from "@/pages/auto/ModuleAutoPage";

export const BetaRoutes = () => {
  return (
    <>
      {/* Beta1 routes */}
      <Route path="/beta1/dashboard" element={<Beta1Dashboard />} />
      <Route path="/beta1/*" element={<ModuleAutoPage />} />
      
      {/* Beta2 routes */}
      <Route path="/beta2/dashboard" element={<Beta2Dashboard />} />
      <Route path="/beta2/analytics" element={<Beta2Analytics />} />
      <Route path="/beta2/members" element={<ModuleAutoPage />} />
      <Route path="/beta2/rewards" element={<ModuleAutoPage />} />
      <Route path="/beta2/settings" element={<ModuleAutoPage />} />
      <Route path="/beta2/*" element={<ModuleAutoPage />} />
    </>
  );
};
