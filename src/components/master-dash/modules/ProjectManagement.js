import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const ProjectManagement = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "PROJECT MANAGEMENT", path: "/projects", variant: "default", features: [
                { name: 'Projects Dashboard', path: '/projects' },
                { name: 'Kanban Board', path: '/project-management/kanban' },
                { name: 'Gantt Chart', path: '/project-management/gantt' },
                { name: 'Team Collaboration', path: '/project-management/team' }
            ] }) }));
};
export default ProjectManagement;
