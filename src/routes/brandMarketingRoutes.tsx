
import React from "react";
import { Route } from "react-router-dom";

// Brand Marketing pages
import BrandDashboard from "@/pages/brand-marketing/BrandDashboard";
import BrandAnalytics from "@/pages/brand-marketing/BrandAnalytics";
import BrandTrust from "@/pages/brand-marketing/BrandTrust";
import MarketPerception from "@/pages/brand-marketing/MarketPerception";
import BrandSettings from "@/pages/brand-marketing/BrandSettings";
import SEOKeywords from "@/pages/brand-marketing/SEOKeywords";
import RequstyPage from "@/pages/RequstyPage";

export const BrandMarketingRoutes = () => {
  return (
    <>
      <Route path="/brand-marketing" element={<BrandDashboard />} />
      <Route path="/brand-marketing/analytics" element={<BrandAnalytics />} />
      <Route path="/brand-marketing/trust-analysis" element={<BrandTrust />} />
      <Route path="/brand-marketing/market-perception" element={<MarketPerception />} />
      <Route path="/brand-marketing/settings" element={<BrandSettings />} />
      <Route path="/brand-marketing/seo" element={<SEOKeywords />} />
      <Route path="/brand-marketing/requesty" element={<RequstyPage />} />
    </>
  );
};
