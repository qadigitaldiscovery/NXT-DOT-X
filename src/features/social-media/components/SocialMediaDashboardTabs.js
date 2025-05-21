import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsOverview } from "./AccountsOverview";
import { SocialDashboardOverview } from "./SocialDashboardOverview";
import { PostsSchedule } from "./PostsSchedule";
export function SocialMediaDashboardTabs() {
    return (_jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "accounts", children: "Accounts" }), _jsx(TabsTrigger, { value: "calendar", children: "Calendar" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-6", children: _jsx(SocialDashboardOverview, {}) }), _jsx(TabsContent, { value: "accounts", className: "space-y-6", children: _jsx(AccountsOverview, {}) }), _jsx(TabsContent, { value: "calendar", className: "space-y-6", children: _jsx(PostsSchedule, {}) })] }));
}
