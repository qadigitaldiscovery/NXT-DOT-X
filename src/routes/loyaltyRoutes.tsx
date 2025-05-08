
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import { LoyaltyLayout } from "@/components/layout/LoyaltyLayout";

// Import Loyalty pages
import LoyaltyDashboard from "@/pages/LoyaltyDashboard";
import LoyaltyMembers from "@/pages/LoyaltyMembers";
import LoyaltyRewards from "@/pages/LoyaltyRewards";
import LoyaltyAnalytics from "@/pages/LoyaltyAnalytics";
import LoyaltySettings from "@/pages/LoyaltySettings";

export const LoyaltyRoutes = () => {
  return (
    <>
      {/* Loyalty Rewards Module Routes */}
      <Route path="/loyalty-rewards" element={
        <PermissionGuard requiredPermission="modules.loyalty">
          <LoyaltyLayout>
            <LoyaltyDashboard />
          </LoyaltyLayout>
        </PermissionGuard>
      } />
      
      <Route path="/loyalty-rewards/members" element={
        <PermissionGuard requiredPermission="modules.loyalty">
          <LoyaltyLayout>
            <LoyaltyMembers />
          </LoyaltyLayout>
        </PermissionGuard>
      } />
      
      <Route path="/loyalty-rewards/rewards" element={
        <PermissionGuard requiredPermission="modules.loyalty">
          <LoyaltyLayout>
            <LoyaltyRewards />
          </LoyaltyLayout>
        </PermissionGuard>
      } />
      
      <Route path="/loyalty-rewards/analytics" element={
        <PermissionGuard requiredPermission="modules.loyalty">
          <LoyaltyLayout>
            <LoyaltyAnalytics />
          </LoyaltyLayout>
        </PermissionGuard>
      } />
      
      <Route path="/loyalty-rewards/settings" element={
        <PermissionGuard requiredPermission="modules.loyalty">
          <LoyaltyLayout>
            <LoyaltySettings />
          </LoyaltyLayout>
        </PermissionGuard>
      } />
    </>
  );
};
