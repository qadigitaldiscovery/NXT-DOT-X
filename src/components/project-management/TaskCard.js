import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CalendarClock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
const TaskCard = ({ task, onClick }) => {
    const priorityColors = {
        low: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        medium: "bg-green-100 text-green-800 hover:bg-green-200",
        high: "bg-orange-100 text-orange-800 hover:bg-orange-200",
        urgent: "bg-red-100 text-red-800 hover:bg-red-200"
    };
    const statusColors = {
        todo: "bg-slate-100 text-slate-800",
        "in-progress": "bg-amber-100 text-amber-800",
        review: "bg-purple-100 text-purple-800",
        done: "bg-green-100 text-green-800"
    };
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();
    };
    const handleClick = () => {
        if (onClick)
            onClick(task);
    };
    return (_jsxs(Card, { className: "mb-3 cursor-pointer hover:shadow-md transition-shadow", onClick: handleClick, children: [_jsxs(CardContent, { className: "p-3", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "font-medium text-sm", children: task.title }), _jsx(Badge, { variant: "outline", className: priorityColors[task.priority], children: task.priority })] }), task.description && (_jsx("p", { className: "text-xs text-gray-600 line-clamp-2 mb-2", children: task.description })), _jsxs("div", { className: "flex items-center text-xs text-gray-500 mb-2", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: task.created_at ? `Created ${formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}` : "Recently created" })] }), task.due_date && (_jsxs("div", { className: "flex items-center text-xs text-gray-500", children: [_jsx(CalendarClock, { className: "h-3 w-3 mr-1" }), _jsxs("span", { children: ["Due: ", new Date(task.due_date).toLocaleDateString()] })] }))] }), _jsxs(CardFooter, { className: "px-3 py-2 flex justify-between items-center border-t", children: [task.assigned_to ? (_jsx(Avatar, { className: "h-6 w-6", children: _jsx(AvatarFallback, { className: "text-xs", children: getInitials(task.assigned_to) }) })) : (_jsx("span", { className: "text-xs text-gray-500", children: "Unassigned" })), _jsx(Badge, { variant: "secondary", className: statusColors[task.status], children: task.status })] })] }));
};
export default TaskCard;
