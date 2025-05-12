
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectManagementLayout from '@/components/layout/ProjectManagementLayout';
import KanbanBoard from '@/components/project-management/KanbanBoard';
import TaskForm from '@/components/project-management/TaskForm';
import TaskDetailDialog from '@/components/project-management/TaskDetailDialog';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { Task } from '@/types/project-management';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const KanbanBoardPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { useProject } = useProjects();
  const { useProjectTasks, createTask, updateTask, deleteTask } = useTasks();
  
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [initialStatus, setInitialStatus] = useState<string>('todo');
  
  // Fetch project and task data
  const { data: project } = useProject(projectId!);
  const { data: tasks = [], isLoading: isLoadingTasks } = useProjectTasks(projectId!);
  
  const handleAddTask = (status: string) => {
    setInitialStatus(status);
    setSelectedTask(null);
    setIsTaskFormOpen(true);
  };
  
  const handleCreateTask = (data: Partial<Task>) => {
    if (projectId) {
      createTask.mutate({
        ...data,
        project_id: projectId,
        status: data.status || initialStatus
      } as Task);
    }
  };
  
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskFormOpen(true);
  };
  
  const handleUpdateTask = (data: Partial<Task>) => {
    if (data.id) {
      updateTask.mutate(data as Task & { id: string });
    }
  };
  
  const handleDeleteTask = (task: Task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask.mutate({ id: task.id, project_id: task.project_id });
      setSelectedTask(null);
    }
  };

  return (
    <ProjectManagementLayout>
      <div className="h-full flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{project?.name || 'Project'} - Kanban Board</h1>
            <p className="text-sm text-gray-500">
              {isLoadingTasks ? 'Loading tasks...' : `${tasks.length} tasks`}
            </p>
          </div>
          <Button onClick={() => handleAddTask('todo')}>
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Task
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <KanbanBoard
            tasks={tasks}
            onAddTask={handleAddTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>
      
      <TaskForm
        isOpen={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        projectId={projectId!}
        task={selectedTask || undefined}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
      />
      
      <TaskDetailDialog
        task={selectedTask}
        isOpen={!!selectedTask && !isTaskFormOpen}
        onOpenChange={(open) => !open && setSelectedTask(null)}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </ProjectManagementLayout>
  );
};

export default KanbanBoardPage;
