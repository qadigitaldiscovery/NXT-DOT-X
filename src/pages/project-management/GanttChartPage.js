import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectManagementLayout from '@/components/layout/ProjectManagementLayout';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addDays, format, eachDayOfInterval, parseISO, isWithinInterval } from 'date-fns';
const GanttChartPage = () => {
    const { projectId } = useParams();
    const { useProject } = useProjects();
    const { useProjectTasks } = useTasks();
    const [days, setDays] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 14));
    // Fetch project and task data
    const { data: project } = useProject(projectId);
    const { data: tasks = [], isLoading: isLoadingTasks } = useProjectTasks(projectId);
    useEffect(() => {
        // Generate dates for the gantt chart
        const dateArray = eachDayOfInterval({ start: startDate, end: endDate });
        setDays(dateArray);
        // If project has start/end dates, use those
        if (project?.start_date) {
            setStartDate(parseISO(project.start_date));
            if (project.end_date) {
                setEndDate(parseISO(project.end_date));
            }
            else {
                setEndDate(addDays(parseISO(project.start_date), 30));
            }
        }
    }, [project]);
    const moveRange = (days) => {
        setStartDate(addDays(startDate, days));
        setEndDate(addDays(endDate, days));
    };
    return (_jsx(ProjectManagementLayout, { children: _jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "border-b p-4 flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-xl font-semibold", children: [project?.name || 'Project', " - Gantt Chart"] }), _jsx("p", { className: "text-sm text-gray-500", children: "Timeline visualization" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => moveRange(-7), children: "Previous Week" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => moveRange(7), children: "Next Week" })] })] }), _jsxs("div", { className: "flex-1 overflow-auto p-4", children: [_jsx(Card, { className: "overflow-x-auto", children: _jsxs("div", { className: "min-w-[800px]", children: [_jsxs("div", { className: "flex border-b", children: [_jsx("div", { className: "w-56 shrink-0 font-medium p-3 border-r", children: "Task" }), days.map((day) => (_jsxs("div", { className: `w-16 shrink-0 text-center p-2 text-xs font-medium ${day.getDay() === 0 || day.getDay() === 6 ? 'bg-gray-50' : ''}`, children: [_jsx("div", { children: format(day, 'EEE') }), _jsx("div", { className: "font-bold", children: format(day, 'd') })] }, day.toString())))] }), isLoadingTasks ? (_jsx("div", { className: "animate-pulse space-y-2 py-2", children: [...Array(5)].map((_, i) => (_jsx("div", { className: "h-8 bg-gray-100 rounded-md mx-3" }, i))) })) : (_jsx(_Fragment, { children: tasks.length > 0 ? (tasks.map((task) => (_jsxs("div", { className: "flex border-b hover:bg-slate-50", children: [_jsx("div", { className: "w-56 shrink-0 p-2 border-r truncate", children: task.title }), _jsx("div", { className: "flex flex-1 relative h-12", children: task.due_date && (_jsx("div", { className: "absolute top-1/2 -translate-y-1/2 h-6 bg-blue-100 border border-blue-300 rounded-sm text-xs flex items-center px-1", style: {
                                                            left: getTaskPosition(task, days),
                                                            width: getTaskWidth(task, days),
                                                            display: isTaskVisible(task, days) ? 'flex' : 'none'
                                                        }, title: `${task.title} - Due: ${task.due_date}`, children: task.title })) })] }, task.id)))) : (_jsx("div", { className: "p-8 text-center text-gray-500", children: "No tasks with dates to display on the Gantt chart." })) }))] }) }), _jsx("div", { className: "text-center text-sm text-gray-500 mt-4", children: "Note: This is a simplified Gantt chart. Only tasks with due dates are shown." })] })] }) }));
};
// Helper functions for Gantt chart positioning
const getTaskPosition = (task, days) => {
    if (!task.due_date)
        return '0%';
    const dueDate = parseISO(task.due_date);
    const daysFromStart = days.findIndex(day => day.getDate() === dueDate.getDate() &&
        day.getMonth() === dueDate.getMonth() &&
        day.getFullYear() === dueDate.getFullYear());
    if (daysFromStart === -1)
        return '0%';
    return `${daysFromStart * 64}px`; // 64px is the width of each day column
};
const getTaskWidth = (task, days) => {
    return '64px'; // Simple implementation: just show on the due date
};
const isTaskVisible = (task, days) => {
    if (!task.due_date)
        return false;
    const dueDate = parseISO(task.due_date);
    return isWithinInterval(dueDate, {
        start: days[0],
        end: days[days.length - 1]
    });
};
export default GanttChartPage;
