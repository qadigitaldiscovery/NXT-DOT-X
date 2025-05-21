import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectManagementLayout from '@/components/layout/ProjectManagementLayout';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import ProjectForm from '@/components/project-management/ProjectForm';
import TaskForm from '@/components/project-management/TaskForm';
import TaskDetailDialog from '@/components/project-management/TaskDetailDialog';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Users, AlertTriangle, CheckCircle2, MoreVertical, Edit, Trash2, PlusCircle, Kanban, BarChart4 } from "lucide-react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
const ProjectDetailsPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { useProject, updateProject, deleteProject } = useProjects();
    const { useProjectTasks, createTask, updateTask, deleteTask } = useTasks();
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    // Fetch project and task data
    const { data: project, isLoading: isLoadingProject } = useProject(projectId);
    const { data: tasks = [], isLoading: isLoadingTasks } = useProjectTasks(projectId);
    // Count tasks by status
    const tasksByStatus = tasks.reduce((acc, task) => {
        const status = task.status || 'todo';
        if (!acc[status])
            acc[status] = [];
        acc[status].push(task);
        return acc;
    }, {});
    const handleUpdateProject = (data) => {
        if (project) {
            updateProject.mutate({ id: project.id, ...data });
        }
    };
    const handleDeleteProject = () => {
        if (project) {
            if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
                deleteProject.mutate(project.id, {
                    onSuccess: () => navigate('/projects/list')
                });
            }
        }
    };
    const handleAddTask = (data) => {
        if (projectId) {
            createTask.mutate({
                ...data,
                project_id: projectId
            });
        }
    };
    const handleEditTask = (task) => {
        setSelectedTask(task);
        setIsTaskFormOpen(true);
    };
    const handleUpdateTask = (data) => {
        if (data.id) {
            updateTask.mutate(data);
        }
    };
    const handleDeleteTask = (task) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask.mutate({ id: task.id, project_id: task.project_id });
            setSelectedTask(null);
        }
    };
    const openTaskDetails = (task) => {
        setSelectedTask(task);
    };
    // Handle loading state
    if (isLoadingProject) {
        return (_jsx(ProjectManagementLayout, { children: _jsx("div", { className: "p-6", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-8 bg-slate-200 rounded w-1/4" }), _jsx("div", { className: "h-4 bg-slate-200 rounded w-1/2" }), _jsx("div", { className: "h-32 bg-slate-200 rounded" })] }) }) }));
    }
    // Handle error when project not found
    if (!project) {
        return (_jsx(ProjectManagementLayout, { children: _jsxs("div", { className: "p-6 text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-red-500", children: "Project Not Found" }), _jsx("p", { className: "mt-2", children: "The project you're looking for doesn't exist or you don't have access to it." }), _jsx(Button, { className: "mt-4", onClick: () => navigate('/projects'), children: "Return to Dashboard" })] }) }));
    }
    // Determine RAG status colors
    const ragColors = {
        green: "bg-green-500",
        amber: "bg-amber-500",
        red: "bg-red-500"
    };
    return (_jsxs(ProjectManagementLayout, { children: [_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold flex items-center", children: [project.name, _jsx("div", { className: `ml-3 w-3 h-3 rounded-full ${project.rag_status ? ragColors[project.rag_status] : "bg-slate-200"}`, title: `RAG Status: ${project.rag_status || "Not set"}` })] }), _jsx("p", { className: "text-slate-500 mt-1", children: project.description || "No description provided" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "outline", onClick: () => navigate(`/projects/${projectId}/kanban`), children: [_jsx(Kanban, { className: "mr-1 h-4 w-4" }), "Kanban Board"] }), _jsxs(Button, { variant: "outline", onClick: () => navigate(`/projects/${projectId}/gantt`), children: [_jsx(BarChart4, { className: "mr-1 h-4 w-4" }), "Gantt Chart"] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { className: "h-5 w-5" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => setIsProjectFormOpen(true), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit Project"] }), _jsxs(DropdownMenuItem, { onClick: handleDeleteProject, className: "text-red-600", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete Project"] })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center p-4", children: [_jsx(Calendar, { className: "h-5 w-5 text-slate-500 mr-4" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Timeline" }), _jsxs("p", { className: "text-sm text-slate-500", children: [project.start_date ? format(new Date(project.start_date), 'MMM d, yyyy') : "Not set", project.end_date ? ` - ${format(new Date(project.end_date), 'MMM d, yyyy')}` : ""] })] })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center p-4", children: [_jsx(Users, { className: "h-5 w-5 text-slate-500 mr-4" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Team" }), _jsx("p", { className: "text-sm text-slate-500", children: "1 owner, 0 contributors" })] })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center p-4", children: [project.rag_status === 'red' ? (_jsx(AlertTriangle, { className: "h-5 w-5 text-red-500 mr-4" })) : (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500 mr-4" })), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Status" }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: `inline-block w-2 h-2 rounded-full mr-1 ${project.rag_status ? ragColors[project.rag_status] : "bg-slate-200"}` }), _jsxs("p", { className: "text-sm text-slate-500 capitalize", children: [project.status, ", ", project.rag_status || "no RAG status"] })] })] })] }) })] }), _jsxs(Card, { className: "mb-6", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Tasks" }), _jsx(CardDescription, { children: "Manage tasks for this project" })] }), _jsxs(Button, { onClick: () => setIsTaskFormOpen(true), children: [_jsx(PlusCircle, { className: "mr-1 h-4 w-4" }), "Add Task"] })] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "all", children: [_jsxs(TabsList, { children: [_jsxs(TabsTrigger, { value: "all", children: ["All ", _jsx("span", { className: "ml-1 text-xs bg-slate-200 rounded-full px-1.5", children: tasks.length })] }), _jsxs(TabsTrigger, { value: "todo", children: ["To Do ", _jsx("span", { className: "ml-1 text-xs bg-slate-200 rounded-full px-1.5", children: tasksByStatus['todo']?.length || 0 })] }), _jsxs(TabsTrigger, { value: "in-progress", children: ["In Progress ", _jsx("span", { className: "ml-1 text-xs bg-slate-200 rounded-full px-1.5", children: tasksByStatus['in-progress']?.length || 0 })] }), _jsxs(TabsTrigger, { value: "done", children: ["Done ", _jsx("span", { className: "ml-1 text-xs bg-slate-200 rounded-full px-1.5", children: tasksByStatus['done']?.length || 0 })] })] }), _jsx(TabsContent, { value: "all", className: "mt-4", children: isLoadingTasks ? (_jsx("div", { className: "animate-pulse space-y-3", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "h-16 bg-slate-100 rounded-md" }, i))) })) : (_jsx(_Fragment, { children: tasks.length > 0 ? (_jsx("div", { className: "space-y-2", children: tasks.map(task => (_jsxs("div", { className: "border rounded-md p-3 hover:bg-slate-50 cursor-pointer flex justify-between", onClick: () => openTaskDetails(task), children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: task.title }), task.description && (_jsx("p", { className: "text-sm text-slate-500 truncate", children: task.description }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [task.due_date && (_jsxs("span", { className: "text-xs text-slate-500", children: ["Due: ", format(new Date(task.due_date), 'MMM d')] })), _jsx("span", { className: cn("text-xs px-2 py-0.5 rounded-full", task.status === 'todo' ? "bg-slate-100 text-slate-800" :
                                                                            task.status === 'in-progress' ? "bg-amber-100 text-amber-800" :
                                                                                task.status === 'review' ? "bg-purple-100 text-purple-800" :
                                                                                    "bg-green-100 text-green-800"), children: task.status }), _jsx("span", { className: cn("text-xs px-2 py-0.5 rounded-full", task.priority === 'low' ? "bg-blue-100 text-blue-800" :
                                                                            task.priority === 'medium' ? "bg-green-100 text-green-800" :
                                                                                task.priority === 'high' ? "bg-orange-100 text-orange-800" :
                                                                                    "bg-red-100 text-red-800"), children: task.priority })] })] }, task.id))) })) : (_jsxs("div", { className: "text-center py-6 bg-slate-50 rounded-md border-2 border-dashed", children: [_jsx("h3", { className: "font-medium", children: "No tasks yet" }), _jsx("p", { className: "text-sm text-slate-500 mt-1 mb-3", children: "Get started by creating your first task" }), _jsxs(Button, { size: "sm", onClick: () => setIsTaskFormOpen(true), children: [_jsx(PlusCircle, { className: "mr-1 h-4 w-4" }), "Create Task"] })] })) })) }), ['todo', 'in-progress', 'done'].map(status => (_jsx(TabsContent, { value: status, className: "mt-4", children: (tasksByStatus[status]?.length || 0) > 0 ? (_jsx("div", { className: "space-y-2", children: tasksByStatus[status]?.map(task => (_jsxs("div", { className: "border rounded-md p-3 hover:bg-slate-50 cursor-pointer flex justify-between", onClick: () => openTaskDetails(task), children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: task.title }), task.description && (_jsx("p", { className: "text-sm text-slate-500 truncate", children: task.description }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [task.due_date && (_jsxs("span", { className: "text-xs text-slate-500", children: ["Due: ", format(new Date(task.due_date), 'MMM d')] })), _jsx("span", { className: cn("text-xs px-2 py-0.5 rounded-full", task.priority === 'low' ? "bg-blue-100 text-blue-800" :
                                                                        task.priority === 'medium' ? "bg-green-100 text-green-800" :
                                                                            task.priority === 'high' ? "bg-orange-100 text-orange-800" :
                                                                                "bg-red-100 text-red-800"), children: task.priority })] })] }, task.id))) })) : (_jsx("div", { className: "text-center py-6 bg-slate-50 rounded-md border-2 border-dashed", children: _jsxs("p", { className: "text-slate-500", children: ["No ", status.replace('-', ' '), " tasks"] }) })) }, status)))] }) })] })] }), _jsx(ProjectForm, { isOpen: isProjectFormOpen, onOpenChange: setIsProjectFormOpen, project: project, onSubmit: handleUpdateProject }), _jsx(TaskForm, { isOpen: isTaskFormOpen, onOpenChange: setIsTaskFormOpen, projectId: projectId, task: selectedTask || undefined, onSubmit: selectedTask ? handleUpdateTask : handleAddTask }), _jsx(TaskDetailDialog, { task: selectedTask, isOpen: !!selectedTask && !isTaskFormOpen, onOpenChange: (open) => !open && setSelectedTask(null), onEdit: handleEditTask, onDelete: handleDeleteTask })] }));
};
export default ProjectDetailsPage;
