
import { ModuleCard } from '../ModuleCard';
import { ClipboardList } from 'lucide-react';

const ProjectManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Project Management"
        icon={<ClipboardList className="h-8 w-8" />}
        path="/projects"
        variant="default"
        features={[
          { name: 'Projects Dashboard', path: '/projects' },
          { name: 'Kanban Board', path: '/project-management/kanban' },
          { name: 'Gantt Chart', path: '/project-management/gantt' },
          { name: 'Team Collaboration', path: '/project-management/team' }
        ]}
      />
    </div>
  );
};

export default ProjectManagement;
