
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ProjectManagementLayout } from '@/components/layout/ProjectManagementLayout';
import ProjectCard from '@/components/project-management/ProjectCard';
import ProjectForm from '@/components/project-management/ProjectForm';
import { useProjects } from '@/hooks/use-projects';
import { Project } from '@/types/project-management';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { useAllProjects, createProject } = useProjects();
  const { data: projects = [], isLoading } = useAllProjects();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === "" || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
    const matchesStatus = !statusFilter || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleCreateProject = (data: Partial<Project>) => {
    if (user) {
      createProject.mutate({
        ...data,
        owner_id: user.id,
      } as Project);
    }
  };

  return (
    <ProjectManagementLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={statusFilter || ""} onValueChange={value => setStatusFilter(value || null)}>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {statusFilter ? `Status: ${statusFilter}` : "All Statuses"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg border shadow-sm animate-pulse h-48"
              />
            ))}
          </div>
        ) : (
          <>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter 
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "Get started by creating a new project."}
                </p>
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  className="mt-4"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Create Project
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <ProjectForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleCreateProject}
      />
    </ProjectManagementLayout>
  );
};

export default ProjectsPage;
