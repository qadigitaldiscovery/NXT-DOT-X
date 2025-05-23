
import React from "react";
import { Route } from "react-router-dom";
import BrandMarketingLayout from "@/components/layout/BrandMarketingLayout";

// Brand Marketing pages
import BrandDashboard from "@/pages/brand-marketing/BrandDashboard";
import BrandAnalytics from "@/pages/brand-marketing/BrandAnalytics";
import BrandTrust from "@/pages/brand-marketing/BrandTrust";
import MarketPerception from "@/pages/brand-marketing/MarketPerception";
import BrandSettings from "@/pages/brand-marketing/BrandSettings";
import SEOKeywords from "@/pages/brand-marketing/SEOKeywords";
import RequestyPage from "@/pages/RequestyPage";

export const BrandMarketingRoutes = () => {
  return (
    <>
      <Route path="/brand-marketing" element={<BrandMarketingLayout />}>
        <Route index element={<BrandDashboard />} />
        <Route path="analytics" element={<BrandAnalytics />} />
        <Route path="trust-analysis" element={<BrandTrust />} />
        <Route path="market-perception" element={<MarketPerception />} />
        <Route path="settings" element={<BrandSettings />} />
        <Route path="seo" element={<SEOKeywords />} />
        <Route path="requesty" element={<RequestyPage />} />
      </Route>
    </>
  );
};
