import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectManagementLayout } from '@/components/layout/ProjectManagementLayout';
import KanbanBoard from '@/components/project-management/KanbanBoard';
import TaskForm from '@/components/project-management/TaskForm';
import TaskDetailDialog from '@/components/project-management/TaskDetailDialog';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
const KanbanBoardPage = () => {
    const { projectId } = useParams();
    const { useProject } = useProjects();
    const { useProjectTasks, createTask, updateTask, deleteTask } = useTasks();
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [initialStatus, setInitialStatus] = useState('todo');
    // Fetch project and task data
    const { data: project } = useProject(projectId);
    const { data: tasks = [], isLoading: isLoadingTasks } = useProjectTasks(projectId);
    const handleAddTask = (status) => {
        setInitialStatus(status);
        setSelectedTask(null);
        setIsTaskFormOpen(true);
    };
    const handleCreateTask = (data) => {
        if (projectId) {
            createTask.mutate({
                ...data,
                project_id: projectId,
                status: data.status || initialStatus
            });
        }
    };
    const handleTaskClick = (task) => {
        setSelectedTask(task);
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
    return (_jsxs(ProjectManagementLayout, { children: [_jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "border-b p-4 flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-xl font-semibold", children: [project?.name || 'Project', " - Kanban Board"] }), _jsx("p", { className: "text-sm text-gray-500", children: isLoadingTasks ? 'Loading tasks...' : `${tasks.length} tasks` })] }), _jsxs(Button, { onClick: () => handleAddTask('todo'), children: [_jsx(PlusCircle, { className: "mr-1 h-4 w-4" }), "Add Task"] })] }), _jsx("div", { className: "flex-1 overflow-hidden", children: _jsx(KanbanBoard, { tasks: tasks, onAddTask: handleAddTask, onTaskClick: handleTaskClick }) })] }), _jsx(TaskForm, { isOpen: isTaskFormOpen, onOpenChange: setIsTaskFormOpen, projectId: projectId, task: selectedTask || undefined, onSubmit: selectedTask ? handleUpdateTask : handleCreateTask }), _jsx(TaskDetailDialog, { task: selectedTask, isOpen: !!selectedTask && !isTaskFormOpen, onOpenChange: (open) => !open && setSelectedTask(null), onEdit: handleEditTask, onDelete: handleDeleteTask })] }));
};
export default KanbanBoardPage;
