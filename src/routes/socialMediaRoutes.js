import { jsx as _jsx } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import Dashboard from "@/pages/social-media/Dashboard";
import Accounts from "@/pages/social-media/Accounts";
import Calendar from "@/pages/social-media/Calendar";
import Engagement from "@/pages/social-media/Engagement";
import Settings from "@/pages/social-media/Settings";
import NotFound from "@/pages/NotFound";
export const SocialMediaRoutes = () => {
    return [
        _jsx(Route, { path: "/social-media", element: _jsx(PlatformLayout, { moduleTitle: "Social Media Dashboard", useGlobalNavigation: true, children: _jsx(Dashboard, {}) }) }, "social-media-dashboard"),
        _jsx(Route, { path: "/social-media/accounts", element: _jsx(PlatformLayout, { moduleTitle: "Social Media Accounts", useGlobalNavigation: true, children: _jsx(Accounts, {}) }) }, "social-media-accounts"),
        _jsx(Route, { path: "/social-media/calendar", element: _jsx(PlatformLayout, { moduleTitle: "Social Media Calendar", useGlobalNavigation: true, children: _jsx(Calendar, {}) }) }, "social-media-calendar"),
        _jsx(Route, { path: "/social-media/engagement", element: _jsx(PlatformLayout, { moduleTitle: "Social Media Engagement", useGlobalNavigation: true, children: _jsx(Engagement, {}) }) }, "social-media-engagement"),
        _jsx(Route, { path: "/social-media/settings", element: _jsx(PlatformLayout, { moduleTitle: "Social Media Settings", useGlobalNavigation: true, children: _jsx(Settings, {}) }) }, "social-media-settings"),
        _jsx(Route, { path: "/social-media/*", element: _jsx(PlatformLayout, { moduleTitle: "Page Not Found", useGlobalNavigation: true, children: _jsx(NotFound, {}) }) }, "social-media-not-found")
    ];
};
