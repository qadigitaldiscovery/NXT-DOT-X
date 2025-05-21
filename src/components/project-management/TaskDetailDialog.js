import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2, Edit, Trash, MessageSquare, File } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
const TaskDetailDialog = ({ task, isOpen, onOpenChange, onEdit, onDelete }) => {
    if (!task)
        return null;
    const priorityColors = {
        low: "bg-blue-100 text-blue-800",
        medium: "bg-green-100 text-green-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800"
    };
    const statusColors = {
        todo: "bg-slate-100 text-slate-800",
        "in-progress": "bg-amber-100 text-amber-800",
        review: "bg-purple-100 text-purple-800",
        done: "bg-green-100 text-green-800"
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-3xl", children: [_jsx(DialogHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsx(DialogTitle, { className: "text-xl font-semibold", children: task.title }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onEdit && onEdit(task), children: [_jsx(Edit, { className: "h-4 w-4 mr-1" }), "Edit"] }), _jsxs(Button, { variant: "destructive", size: "sm", onClick: () => onDelete && onDelete(task), children: [_jsx(Trash, { className: "h-4 w-4 mr-1" }), "Delete"] })] })] }) }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx("div", { className: "col-span-2", children: _jsxs("div", { className: "space-y-6", children: [task.description ? (_jsxs("div", { className: "mt-2", children: [_jsx("h3", { className: "text-sm font-medium mb-1 text-slate-600", children: "Description" }), _jsx("p", { className: "text-sm whitespace-pre-line", children: task.description })] })) : (_jsx("div", { className: "mt-2 p-4 border border-dashed rounded-md", children: _jsx("p", { className: "text-sm text-slate-400", children: "No description provided" }) })), _jsxs("div", { children: [_jsxs("h3", { className: "text-sm font-medium mb-2 text-slate-600 flex items-center", children: [_jsx(MessageSquare, { className: "h-4 w-4 mr-1" }), "Comments"] }), _jsx("p", { className: "text-sm text-slate-400 p-4 border border-dashed rounded-md", children: "No comments yet" })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-sm font-medium mb-2 text-slate-600 flex items-center", children: [_jsx(File, { className: "h-4 w-4 mr-1" }), "Attachments"] }), _jsx("p", { className: "text-sm text-slate-400 p-4 border border-dashed rounded-md", children: "No attachments" })] })] }) }), _jsxs("div", { className: "space-y-4 border-l pl-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xs font-medium mb-1 uppercase text-slate-500", children: "Status" }), _jsx(Badge, { className: statusColors[task.status], children: task.status })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xs font-medium mb-1 uppercase text-slate-500", children: "Priority" }), _jsx(Badge, { variant: "outline", className: priorityColors[task.priority], children: task.priority })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xs font-medium mb-1 uppercase text-slate-500", children: "Assignee" }), _jsx("p", { className: "text-sm", children: task.assigned_to || "Unassigned" })] }), task.due_date && (_jsxs("div", { children: [_jsxs("h3", { className: "text-xs font-medium mb-1 uppercase text-slate-500 flex items-center", children: [_jsx(Calendar, { className: "h-3 w-3 mr-1" }), "Due Date"] }), _jsx("p", { className: "text-sm", children: new Date(task.due_date).toLocaleDateString() })] })), _jsxs("div", { children: [_jsxs("h3", { className: "text-xs font-medium mb-1 uppercase text-slate-500 flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), "Created"] }), _jsx("p", { className: "text-sm", children: task.created_at
                                                ? formatDistanceToNow(new Date(task.created_at), { addSuffix: true })
                                                : "Recently" })] }), task.time_estimated && (_jsxs("div", { children: [_jsx("h3", { className: "text-xs font-medium mb-1 uppercase text-slate-500", children: "Time Tracking" }), _jsxs("div", { className: "flex items-center", children: [_jsx(CheckCircle2, { className: "h-4 w-4 mr-1 text-slate-500" }), _jsxs("span", { className: "text-sm", children: [task.time_spent || 0, " / ", task.time_estimated, " hours"] })] })] }))] })] })] }) }));
};
export default TaskDetailDialog;
