import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DashboardHeader } from "@/components/beta2/dashboard/DashboardHeader";
import { Calendar, Plus } from "lucide-react";
import { SocialMediaDashboardTabs } from "@/features/social-media/components/SocialMediaDashboardTabs";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getLinkClassName } from "@/lib/link-utils";
export default function SocialMediaDashboard() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "container mx-auto py-6 space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(DashboardHeader, { title: "Social Media Dashboard", description: "Manage your social media accounts, posts, and campaigns" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("a", { href: "/social-media/calendar", onClick: (e) => {
                                    e.preventDefault();
                                    navigate("/social-media/calendar");
                                }, className: cn(getLinkClassName(), "inline-flex items-center text-sm"), "aria-label": "View social media calendar", children: [_jsx(Calendar, { size: 16, className: "mr-2", "aria-hidden": "true" }), "View Calendar"] }), _jsxs("a", { href: "/social-media/create-post", onClick: (e) => {
                                    e.preventDefault();
                                    navigate("/social-media/create-post");
                                }, className: cn(getLinkClassName(), "inline-flex items-center text-sm"), "aria-label": "Create new social media post", children: [_jsx(Plus, { size: 16, className: "mr-2", "aria-hidden": "true" }), "Create Post"] })] })] }), _jsx(SocialMediaDashboardTabs, {})] }));
}
