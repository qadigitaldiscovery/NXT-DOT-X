
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectManagementLayout from '@/components/layout/ProjectManagementLayout';
import { useProjects } from '@/hooks/use-projects';
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, BarChart, Timer, CheckCircle2, AlertTriangle } from 'lucide-react';

const ProjectsDashboardPage = () => {
  const navigate = useNavigate();
  const { useAllProjects } = useProjects();
  const { data: projects = [], isLoading } = useAllProjects();
  
  const handleCreateProject = () => {
    navigate('/projects/list');
  };
  
  // Count projects by status
  const statusCounts = projects.reduce((acc, project) => {
    const status = project.status || 'active';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count projects by RAG status
  const ragCounts = projects.reduce((acc, project) => {
    const rag = project.rag_status || 'green';
    acc[rag] = (acc[rag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <ProjectManagementLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <Button onClick={handleCreateProject}>
            <Plus className="mr-1 h-4 w-4" />
            Create Project
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <BarChart className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold">{statusCounts['active'] || 0}</p>
              </div>
              <Timer className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold">{statusCounts['completed'] || 0}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">At Risk</p>
                <p className="text-2xl font-bold">{(ragCounts['amber'] || 0) + (ragCounts['red'] || 0)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/projects/list')}>
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-md" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map(project => (
                  <div 
                    key={project.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium">{project.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{project.description || 'No description'}</p>
                  </div>
                ))}
                
                {projects.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No projects found</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={handleCreateProject}
                    >
                      Create your first project
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Project Status Summary</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Active Projects</span>
                  <span>{statusCounts['active'] || 0} of {projects.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${projects.length ? (statusCounts['active'] || 0) / projects.length * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>On Hold</span>
                  <span>{statusCounts['on-hold'] || 0} of {projects.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${projects.length ? (statusCounts['on-hold'] || 0) / projects.length * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completed</span>
                  <span>{statusCounts['completed'] || 0} of {projects.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${projects.length ? (statusCounts['completed'] || 0) / projects.length * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risk Status</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="flex-1 p-2 bg-green-100 text-green-800 rounded text-center">
                    <div className="font-bold">{ragCounts['green'] || 0}</div>
                    <div className="text-xs">Green</div>
                  </div>
                  <div className="flex-1 p-2 bg-amber-100 text-amber-800 rounded text-center">
                    <div className="font-bold">{ragCounts['amber'] || 0}</div>
                    <div className="text-xs">Amber</div>
                  </div>
                  <div className="flex-1 p-2 bg-red-100 text-red-800 rounded text-center">
                    <div className="font-bold">{ragCounts['red'] || 0}</div>
                    <div className="text-xs">Red</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectManagementLayout>
  );
};

export default ProjectsDashboardPage;
