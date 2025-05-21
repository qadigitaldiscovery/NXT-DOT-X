import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Link as LinkIcon, Users, BarChart3 } from "lucide-react";
export function SocialAccountCard({ account, onEdit, onDelete, onDisconnect }) {
    // Helper function to get color and icon based on platform
    const getPlatformDetails = (platform) => {
        switch (platform) {
            case 'twitter':
                return { color: 'bg-blue-500', textColor: 'text-blue-500' };
            case 'facebook':
                return { color: 'bg-blue-700', textColor: 'text-blue-700' };
            case 'instagram':
                return { color: 'bg-pink-600', textColor: 'text-pink-600' };
            case 'linkedin':
                return { color: 'bg-blue-800', textColor: 'text-blue-800' };
            case 'tiktok':
                return { color: 'bg-black', textColor: 'text-black' };
            case 'pinterest':
                return { color: 'bg-red-600', textColor: 'text-red-600' };
            case 'youtube':
                return { color: 'bg-red-700', textColor: 'text-red-700' };
            default:
                return { color: 'bg-gray-500', textColor: 'text-gray-500' };
        }
    };
    const { color, textColor } = getPlatformDetails(account.platform);
    const capitalizedPlatform = account.platform.charAt(0).toUpperCase() + account.platform.slice(1);
    return (_jsxs(Card, { className: "overflow-hidden transition-shadow hover:shadow-md", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Avatar, { className: `h-8 w-8 ${color}`, children: [_jsx(AvatarImage, { src: account.profileImageUrl, alt: account.username }), _jsx(AvatarFallback, { className: "text-white", children: capitalizedPlatform.slice(0, 2) })] }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: account.username }), _jsx(CardDescription, { className: "text-xs capitalize", children: capitalizedPlatform })] })] }), _jsx(Badge, { variant: account.connected ? "outline" : "secondary", children: account.connected ? "Connected" : "Not Connected" })] }) }), _jsxs(CardContent, { className: "pt-2 pb-3", children: [account.stats && (_jsxs("div", { className: "flex items-center justify-between py-2", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Users, { size: 16, className: `mr-1 ${textColor}` }), _jsx("span", { className: "text-sm font-medium", children: account.stats.followers.toLocaleString() })] }), account.stats.engagement && (_jsxs("div", { className: "flex items-center", children: [_jsx(BarChart3, { size: 16, className: `mr-1 ${textColor}` }), _jsxs("span", { className: "text-sm font-medium", children: [account.stats.engagement, "%"] })] }))] })), _jsxs("div", { className: "flex items-center space-x-2 pt-3", children: [_jsxs("a", { href: "#", onClick: (e) => {
                                    e.preventDefault();
                                    onEdit(account.id);
                                }, className: "flex-1 text-center text-gray-700 hover:text-blue-600 hover:underline text-sm py-1", children: [_jsx(Pencil, { size: 14, className: "mr-1 inline-block" }), "Edit"] }), account.connected ? (_jsxs("a", { href: "#", onClick: (e) => {
                                    e.preventDefault();
                                    onDisconnect(account.id);
                                }, className: "flex-1 text-center text-gray-700 hover:text-blue-600 hover:underline text-sm py-1", children: [_jsx(LinkIcon, { size: 14, className: "mr-1 inline-block" }), "Disconnect"] })) : (_jsxs("a", { href: "#", onClick: (e) => {
                                    e.preventDefault();
                                    onDelete(account.id);
                                }, className: "flex-1 text-center text-red-600 hover:text-red-800 hover:underline text-sm py-1", children: [_jsx(Trash2, { size: 14, className: "mr-1 inline-block" }), "Remove"] }))] })] })] }));
}
