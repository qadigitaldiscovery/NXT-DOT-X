import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
const KanbanBoard = ({ tasks, onAddTask, onTaskClick }) => {
    const [groupedTasks, setGroupedTasks] = useState({
        todo: [],
        'in-progress': [],
        review: [],
        done: []
    });
    const columnTitles = {
        todo: "To Do",
        'in-progress': "In Progress",
        review: "Review",
        done: "Done"
    };
    // Group tasks by status
    useEffect(() => {
        const grouped = tasks.reduce((acc, task) => {
            const status = task.status || 'todo';
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(task);
            return acc;
        }, {
            todo: [],
            'in-progress': [],
            review: [],
            done: []
        });
        setGroupedTasks(grouped);
    }, [tasks]);
    const handleAddTask = (status) => {
        if (onAddTask)
            onAddTask(status);
    };
    return (_jsx("div", { className: "flex space-x-4 h-full overflow-x-auto px-4 py-3", children: Object.entries(columnTitles).map(([status, title]) => (_jsxs("div", { className: "bg-slate-50 rounded-lg w-72 flex-shrink-0 flex flex-col shadow-sm", children: [_jsxs("div", { className: "p-3 font-medium border-b border-slate-200 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: title }), _jsx("span", { className: "bg-slate-200 text-slate-600 text-xs rounded-full px-2 py-0.5", children: groupedTasks[status]?.length || 0 })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: () => handleAddTask(status), children: _jsx(PlusCircle, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-2", children: [groupedTasks[status]?.map(task => (_jsx(TaskCard, { task: task, onClick: () => onTaskClick && onTaskClick(task) }, task.id))), groupedTasks[status]?.length === 0 && (_jsx("div", { className: "flex items-center justify-center h-24 border border-dashed rounded-md border-slate-200 text-slate-400 text-sm", children: "No tasks" }))] })] }, status))) }));
};
export default KanbanBoard;
