import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(BrandMarketingLayout, {}),
        children: [
            {
                index: true,
                element: _jsx(BrandDashboard, {}),
            },
            {
                path: "analytics",
                element: _jsx(BrandAnalytics, {}),
            },
            {
                path: "trust-analysis",
                element: _jsx(BrandTrust, {}),
            },
            {
                path: "market-perception",
                element: _jsx(MarketPerception, {}),
            },
            {
                path: "settings",
                element: _jsx(BrandSettings, {}),
            },
            {
                path: "seo",
                element: _jsx(SEOKeywords, {}),
            },
            {
                path: "requesty",
                element: _jsx(RequestyPage, {}),
            },
        ],
    },
];
