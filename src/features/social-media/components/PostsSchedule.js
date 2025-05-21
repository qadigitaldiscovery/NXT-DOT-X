import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { mockPosts } from "../api/mockData";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export function PostsSchedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [posts] = useState(mockPosts);
    // Filter posts for the selected date if any is selected
    const filteredPosts = selectedDate
        ? posts.filter(post => {
            const postDate = post.scheduledFor
                ? new Date(post.scheduledFor)
                : post.publishedAt
                    ? new Date(post.publishedAt)
                    : null;
            return postDate &&
                postDate.getDate() === selectedDate.getDate() &&
                postDate.getMonth() === selectedDate.getMonth() &&
                postDate.getFullYear() === selectedDate.getFullYear();
        })
        : [];
    // Function to get platform color and abbreviation
    const getPlatformDetails = (platform) => {
        switch (platform) {
            case 'twitter':
                return { color: 'bg-blue-500', abbr: 'TW' };
            case 'facebook':
                return { color: 'bg-blue-700', abbr: 'FB' };
            case 'instagram':
                return { color: 'bg-pink-600', abbr: 'IG' };
            case 'linkedin':
                return { color: 'bg-blue-800', abbr: 'LI' };
            case 'tiktok':
                return { color: 'bg-black', abbr: 'TK' };
            default:
                return { color: 'bg-gray-500', abbr: 'SM' };
        }
    };
    // Function to get badge variant based on post status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return _jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: "Published" });
            case 'scheduled':
                return _jsx(Badge, { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", children: "Scheduled" });
            case 'draft':
                return _jsx(Badge, { variant: "outline", children: "Draft" });
            case 'failed':
                return _jsx(Badge, { variant: "destructive", children: "Failed" });
            default:
                return _jsx(Badge, { variant: "secondary", children: status });
        }
    };
    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-1", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Calendar" }), _jsx(CardDescription, { children: "Select a date to view scheduled posts" })] }), _jsx(CardContent, { children: _jsx(Calendar, { mode: "single", selected: selectedDate, onSelect: setSelectedDate, className: "border rounded-md p-3 pointer-events-auto" }) })] }), _jsxs(Card, { className: "lg:col-span-2", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Posts for ", selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Today'] }), _jsxs(CardDescription, { children: [filteredPosts.length, " posts ", filteredPosts.length === 1 ? 'is' : 'are', " scheduled or published on this date"] })] }), _jsx(CardContent, { children: filteredPosts.length > 0 ? (_jsx("div", { className: "space-y-4", children: filteredPosts.map((post) => {
                                const { color, abbr } = getPlatformDetails(post.platform);
                                const postTime = post.scheduledFor || post.publishedAt;
                                return (_jsxs("div", { className: "flex items-start space-x-4 p-4 border rounded-md hover:bg-gray-50 transition-colors", children: [_jsx(Avatar, { className: `h-10 w-10 ${color}`, children: _jsx(AvatarFallback, { className: "text-white", children: abbr }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm font-medium text-gray-900 truncate", children: [post.content.text?.substring(0, 50), post.content.text && post.content.text.length > 50 ? '...' : ''] }), getStatusBadge(post.status)] }), _jsx("div", { className: "mt-1", children: _jsx("p", { className: "text-xs text-gray-500", children: postTime && format(new Date(postTime), 'h:mm a') }) }), post.content.mediaUrls && post.content.mediaUrls.length > 0 && (_jsx("div", { className: "mt-2 flex items-center space-x-1", children: _jsxs("span", { className: "text-xs text-gray-500", children: [post.content.mediaUrls.length, " media ", post.content.mediaUrls.length === 1 ? 'file' : 'files'] }) }))] })] }, post.id));
                            }) })) : (_jsx("div", { className: "text-center py-8 text-gray-500", children: _jsx("p", { children: "No posts scheduled for this date." }) })) })] })] }));
}
