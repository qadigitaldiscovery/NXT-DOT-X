import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import LoyaltyDashboard from "@/pages/LoyaltyDashboard";
import LoyaltyAnalytics from "@/pages/LoyaltyAnalytics";
import LoyaltyMembers from "@/pages/LoyaltyMembers";
import LoyaltyRewards from "@/pages/LoyaltyRewards";
import LoyaltySettings from "@/pages/LoyaltySettings";
import { LoyaltyLayout } from "@/components/layout/LoyaltyLayout";
export const LoyaltyRoutes = () => {
    return [
        _jsxs(Route, { path: "/loyalty-rewards", element: _jsx(LoyaltyLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(LoyaltyDashboard, {}) }), _jsx(Route, { path: "analytics", element: _jsx(LoyaltyAnalytics, {}) }), _jsx(Route, { path: "members", element: _jsx(LoyaltyMembers, {}) }), _jsx(Route, { path: "rewards", element: _jsx(LoyaltyRewards, {}) }), _jsx(Route, { path: "settings", element: _jsx(LoyaltySettings, {}) })] }, "loyalty")
    ];
};
