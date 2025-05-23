
import React from 'react';
import { Folder } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Project Management"
      description="Manage projects, tasks, and team collaboration"
      icon={<Folder size={24} />}
      features={[
        { name: 'Project Dashboard', path: '/projects/dashboard' },
        { name: 'Kanban Board', path: '/projects/kanban' },
        { name: 'Gantt Charts', path: '/projects/gantt' },
        { name: 'Team Collaboration', path: '/projects/team' }
      ]}
      onClick={() => navigate('/projects')}
    />
  );
};

export default ProjectManagement;
