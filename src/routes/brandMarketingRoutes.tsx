import React from "react";
import BrandMarketingLayout from "../components/layout/BrandMarketingLayout";
import BrandDashboard from "../pages/brand-marketing/BrandDashboard";
import BrandAnalytics from "../pages/brand-marketing/BrandAnalytics";
import BrandTrust from "../pages/brand-marketing/BrandTrust";
import MarketPerception from "../pages/brand-marketing/MarketPerception";
import BrandSettings from "../pages/brand-marketing/BrandSettings";
import SEOKeywords from "../pages/brand-marketing/SEOKeywords";
import RequestyPage from "../pages/brand-marketing/RequestyPage";

export const BrandMarketingRoutes = [
  {
    path: "/brand-marketing",
    element: <BrandMarketingLayout />,
    children: [
      {
        index: true,
        element: <BrandDashboard />,
      },
      {
        path: "analytics",
        element: <BrandAnalytics />,
      },
      {
        path: "trust-analysis",
        element: <BrandTrust />,
      },
      {
        path: "market-perception",
        element: <MarketPerception />,
      },
      {
        path: "settings",
        element: <BrandSettings />,
      },
      {
        path: "seo",
        element: <SEOKeywords />,
      },
      {
        path: "requesty",
        element: <RequestyPage />,
      },
    ],
  },
];
