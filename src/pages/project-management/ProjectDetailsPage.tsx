
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectManagementLayout from '@/components/layout/ProjectManagementLayout';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import ProjectForm from '@/components/project-management/ProjectForm';
import TaskForm from '@/components/project-management/TaskForm';
import TaskDetailDialog from '@/components/project-management/TaskDetailDialog';
import { Task } from '@/types/project-management';
import { 
  Button,
  buttonVariants
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  MoreVertical,
  Edit,
  Trash2,
  PlusCircle,
  Kanban,
  BarChart4
} from "lucide-react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { useProject, updateProject, deleteProject } = useProjects();
  const { useProjectTasks, createTask, updateTask, deleteTask } = useTasks();
  
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Fetch project and task data
  const { data: project, isLoading: isLoadingProject } = useProject(projectId!);
  const { data: tasks = [], isLoading: isLoadingTasks } = useProjectTasks(projectId!);
  
  // Count tasks by status
  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status || 'todo';
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
  
  const handleUpdateProject = (data: any) => {
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
  
  const handleAddTask = (data: Partial<Task>) => {
    if (projectId) {
      createTask.mutate({
        ...data,
        project_id: projectId
      } as Task);
    }
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
  
  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
  };

  // Handle loading state
  if (isLoadingProject) {
    return (
      <ProjectManagementLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </ProjectManagementLayout>
    );
  }

  // Handle error when project not found
  if (!project) {
    return (
      <ProjectManagementLayout>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500">Project Not Found</h1>
          <p className="mt-2">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/projects')}
          >
            Return to Dashboard
          </Button>
        </div>
      </ProjectManagementLayout>
    );
  }

  // Determine RAG status colors
  const ragColors = {
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500"
  };

  return (
    <ProjectManagementLayout>
      <div className="p-6">
        {/* Project header section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              {project.name}
              <div 
                className={`ml-3 w-3 h-3 rounded-full ${project.rag_status ? ragColors[project.rag_status] : "bg-slate-200"}`}
                title={`RAG Status: ${project.rag_status || "Not set"}`}
              ></div>
            </h1>
            <p className="text-slate-500 mt-1">{project.description || "No description provided"}</p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/projects/${projectId}/kanban`)}
            >
              <Kanban className="mr-1 h-4 w-4" />
              Kanban Board
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(`/projects/${projectId}/gantt`)}
            >
              <BarChart4 className="mr-1 h-4 w-4" />
              Gantt Chart
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsProjectFormOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteProject} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Project metadata cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="flex items-center p-4">
              <Calendar className="h-5 w-5 text-slate-500 mr-4" />
              <div>
                <p className="text-sm font-medium">Timeline</p>
                <p className="text-sm text-slate-500">
                  {project.start_date ? format(new Date(project.start_date), 'MMM d, yyyy') : "Not set"} 
                  {project.end_date ? ` - ${format(new Date(project.end_date), 'MMM d, yyyy')}` : ""}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-4">
              <Users className="h-5 w-5 text-slate-500 mr-4" />
              <div>
                <p className="text-sm font-medium">Team</p>
                <p className="text-sm text-slate-500">
                  {/* Replace with actual team members count when implemented */}
                  1 owner, 0 contributors
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-4">
              {project.rag_status === 'red' ? (
                <AlertTriangle className="h-5 w-5 text-red-500 mr-4" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-4" />
              )}
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${project.rag_status ? ragColors[project.rag_status] : "bg-slate-200"}`}></span>
                  <p className="text-sm text-slate-500 capitalize">
                    {project.status}, {project.rag_status || "no RAG status"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tasks section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Manage tasks for this project</CardDescription>
              </div>
              <Button onClick={() => setIsTaskFormOpen(true)}>
                <PlusCircle className="mr-1 h-4 w-4" />
                Add Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  All <span className="ml-1 text-xs bg-slate-200 rounded-full px-1.5">{tasks.length}</span>
                </TabsTrigger>
                <TabsTrigger value="todo">
                  To Do <span className="ml-1 text-xs bg-slate-200 rounded-full px-1.5">{tasksByStatus['todo']?.length || 0}</span>
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress <span className="ml-1 text-xs bg-slate-200 rounded-full px-1.5">{tasksByStatus['in-progress']?.length || 0}</span>
                </TabsTrigger>
                <TabsTrigger value="done">
                  Done <span className="ml-1 text-xs bg-slate-200 rounded-full px-1.5">{tasksByStatus['done']?.length || 0}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {isLoadingTasks ? (
                  <div className="animate-pulse space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-slate-100 rounded-md" />
                    ))}
                  </div>
                ) : (
                  <>
                    {tasks.length > 0 ? (
                      <div className="space-y-2">
                        {tasks.map(task => (
                          <div 
                            key={task.id}
                            className="border rounded-md p-3 hover:bg-slate-50 cursor-pointer flex justify-between"
                            onClick={() => openTaskDetails(task)}
                          >
                            <div>
                              <h3 className="font-medium">{task.title}</h3>
                              {task.description && (
                                <p className="text-sm text-slate-500 truncate">{task.description}</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {task.due_date && (
                                <span className="text-xs text-slate-500">
                                  Due: {format(new Date(task.due_date), 'MMM d')}
                                </span>
                              )}
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                task.status === 'todo' ? "bg-slate-100 text-slate-800" :
                                task.status === 'in-progress' ? "bg-amber-100 text-amber-800" :
                                task.status === 'review' ? "bg-purple-100 text-purple-800" :
                                "bg-green-100 text-green-800"
                              )}>
                                {task.status}
                              </span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                task.priority === 'low' ? "bg-blue-100 text-blue-800" :
                                task.priority === 'medium' ? "bg-green-100 text-green-800" :
                                task.priority === 'high' ? "bg-orange-100 text-orange-800" :
                                "bg-red-100 text-red-800"
                              )}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-slate-50 rounded-md border-2 border-dashed">
                        <h3 className="font-medium">No tasks yet</h3>
                        <p className="text-sm text-slate-500 mt-1 mb-3">Get started by creating your first task</p>
                        <Button 
                          size="sm" 
                          onClick={() => setIsTaskFormOpen(true)}
                        >
                          <PlusCircle className="mr-1 h-4 w-4" />
                          Create Task
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              {/* Similar content for other tabs with filtered tasks */}
              {['todo', 'in-progress', 'done'].map(status => (
                <TabsContent key={status} value={status} className="mt-4">
                  {(tasksByStatus[status]?.length || 0) > 0 ? (
                    <div className="space-y-2">
                      {tasksByStatus[status]?.map(task => (
                        <div 
                          key={task.id}
                          className="border rounded-md p-3 hover:bg-slate-50 cursor-pointer flex justify-between"
                          onClick={() => openTaskDetails(task)}
                        >
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            {task.description && (
                              <p className="text-sm text-slate-500 truncate">{task.description}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {task.due_date && (
                              <span className="text-xs text-slate-500">
                                Due: {format(new Date(task.due_date), 'MMM d')}
                              </span>
                            )}
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              task.priority === 'low' ? "bg-blue-100 text-blue-800" :
                              task.priority === 'medium' ? "bg-green-100 text-green-800" :
                              task.priority === 'high' ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            )}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-slate-50 rounded-md border-2 border-dashed">
                      <p className="text-slate-500">No {status.replace('-', ' ')} tasks</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Forms and dialogs */}
      <ProjectForm
        isOpen={isProjectFormOpen}
        onOpenChange={setIsProjectFormOpen}
        project={project}
        onSubmit={handleUpdateProject}
      />
      
      <TaskForm
        isOpen={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        projectId={projectId!}
        task={selectedTask || undefined}
        onSubmit={selectedTask ? handleUpdateTask : handleAddTask}
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

export default ProjectDetailsPage;
