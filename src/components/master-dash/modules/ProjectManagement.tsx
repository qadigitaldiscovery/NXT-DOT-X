
import { ModuleCard } from '../ModuleCard';

const ProjectManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="PROJECT MANAGEMENT"
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
