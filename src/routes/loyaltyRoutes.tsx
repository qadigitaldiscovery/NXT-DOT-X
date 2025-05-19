
import React from "react";
import { Route } from "react-router-dom";
import LoyaltyDashboard from "@/pages/LoyaltyDashboard";
import LoyaltyAnalytics from "@/pages/LoyaltyAnalytics";
import LoyaltyMembers from "@/pages/LoyaltyMembers";
import LoyaltyRewards from "@/pages/LoyaltyRewards";
import LoyaltySettings from "@/pages/LoyaltySettings";
import { LoyaltyLayout } from "@/components/layout/LoyaltyLayout";

export const LoyaltyRoutes = () => {
  return [
    <Route key="loyalty" path="/loyalty-rewards" element={<LoyaltyLayout />}>
      <Route index element={<LoyaltyDashboard />} />
      <Route path="analytics" element={<LoyaltyAnalytics />} />
      <Route path="members" element={<LoyaltyMembers />} />
      <Route path="rewards" element={<LoyaltyRewards />} />
      <Route path="settings" element={<LoyaltySettings />} />
    </Route>
  ];
};
