import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarRange, Edit3, BarChart3, Users } from "lucide-react";
function OverviewCard({ title, value, description, icon, trend }) {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-base font-medium", children: title }), _jsx("div", { className: "h-6 w-6 text-muted-foreground", children: icon })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: value }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardDescription, { children: description }), trend && (_jsxs("span", { className: `text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`, children: [trend.isPositive ? '↑' : '↓', " ", trend.value, "%"] }))] })] })] }));
}
const engagementData = [
    { name: 'Sun', value: 420 },
    { name: 'Mon', value: 380 },
    { name: 'Tue', value: 510 },
    { name: 'Wed', value: 470 },
    { name: 'Thu', value: 620 },
    { name: 'Fri', value: 580 },
    { name: 'Sat', value: 650 },
];
const followerData = [
    { name: 'Jan', value: 3200 },
    { name: 'Feb', value: 3700 },
    { name: 'Mar', value: 4300 },
    { name: 'Apr', value: 4800 },
    { name: 'May', value: 5200 },
    { name: 'Jun', value: 5900 },
    { name: 'Jul', value: 6400 },
];
export function SocialDashboardOverview() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(OverviewCard, { title: "Total Engagements", value: "3,752", description: "Last 7 days", icon: _jsx(BarChart3, {}), trend: { value: 12.5, isPositive: true } }), _jsx(OverviewCard, { title: "Total Followers", value: "84,770", description: "Across all platforms", icon: _jsx(Users, {}), trend: { value: 3.2, isPositive: true } }), _jsx(OverviewCard, { title: "Scheduled Posts", value: "12", description: "Next 7 days", icon: _jsx(CalendarRange, {}) }), _jsx(OverviewCard, { title: "Content Created", value: "37", description: "Last 30 days", icon: _jsx(Edit3, {}) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Weekly Engagement" }), _jsx(CardDescription, { children: "Total engagements across all platforms" })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(LineChart, { data: engagementData, children: [_jsx(XAxis, { dataKey: "name", tickLine: false, axisLine: false }), _jsx(YAxis, { tickFormatter: (value) => `${value}`, tickLine: false, axisLine: false }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#0ea5e9", strokeWidth: 2, dot: { r: 4 }, activeDot: { r: 6 } })] }) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Follower Growth" }), _jsx(CardDescription, { children: "Monthly follower count across all platforms" })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(LineChart, { data: followerData, children: [_jsx(XAxis, { dataKey: "name", tickLine: false, axisLine: false }), _jsx(YAxis, { tickFormatter: (value) => `${value}`, tickLine: false, axisLine: false }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#10b981", strokeWidth: 2, dot: { r: 4 }, activeDot: { r: 6 } })] }) }) })] })] })] }));
}
