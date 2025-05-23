
import React from 'react';
import { Folder } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const ProjectManagement = () => {
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
      onClick={() => window.location.href = '/projects'}
    />
  );
};

export default ProjectManagement;
