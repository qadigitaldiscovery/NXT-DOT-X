import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Users, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
export const ProjectCard = ({ project }) => {
    const statusColors = {
        active: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        "on-hold": "bg-yellow-100 text-yellow-800",
        cancelled: "bg-red-100 text-red-800",
        planned: "bg-purple-100 text-purple-800"
    };
    const ragColors = {
        green: "bg-green-500",
        amber: "bg-amber-500",
        red: "bg-red-500"
    };
    return (_jsx(Card, { className: "overflow-hidden hover:shadow-md transition-shadow", children: _jsxs(Link, { to: `/projects/${project.id}`, children: [_jsx("div", { className: `h-1 ${project.rag_status ? ragColors[project.rag_status] : "bg-slate-200"}` }), _jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsx(CardTitle, { className: "text-lg", children: project.name }), _jsx(Badge, { variant: "outline", className: statusColors[project.status], children: project.status })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-gray-600 line-clamp-2 mb-4", children: project.description || "No description provided" }), _jsxs("div", { className: "flex items-center text-sm text-gray-500 mt-2", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), _jsx("span", { children: project.created_at ? `Created ${formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}` : "Recently created" })] }), project.start_date && (_jsxs("div", { className: "flex items-center text-sm text-gray-500 mt-2", children: [_jsx(Calendar, { className: "h-4 w-4 mr-1" }), _jsxs("span", { children: ["Starts: ", new Date(project.start_date).toLocaleDateString()] }), project.end_date && (_jsxs("span", { className: "ml-2", children: ["- Ends: ", new Date(project.end_date).toLocaleDateString()] }))] }))] }), _jsxs(CardFooter, { className: "pt-0 flex justify-between border-t py-3", children: [_jsxs("div", { className: "flex items-center text-sm", children: [_jsx(CheckCircle2, { className: "h-4 w-4 mr-1 text-gray-500" }), _jsxs("span", { children: [project.task_count || 0, " tasks"] })] }), _jsxs("div", { className: "flex items-center text-sm", children: [_jsx(Users, { className: "h-4 w-4 mr-1 text-gray-500" }), _jsxs("span", { children: [project.member_count || 0, " members"] })] })] })] }) }));
};
export default ProjectCard;
