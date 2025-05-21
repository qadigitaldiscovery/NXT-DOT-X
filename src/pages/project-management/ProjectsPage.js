import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ProjectManagementLayout } from '@/components/layout/ProjectManagementLayout';
import ProjectCard from '@/components/project-management/ProjectCard';
import ProjectForm from '@/components/project-management/ProjectForm';
import { useProjects } from '@/hooks/use-projects';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
const ProjectsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { useAllProjects, createProject } = useProjects();
    const { data: projects = [], isLoading } = useAllProjects();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    // Filter projects based on search and status
    const filteredProjects = projects.filter(project => {
        const matchesSearch = searchTerm === "" ||
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    const handleCreateProject = (data) => {
        if (user) {
            createProject.mutate({
                ...data,
                owner_id: user.id,
            });
        }
    };
    return (_jsxs(ProjectManagementLayout, { children: [_jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Projects" }), _jsxs(Button, { onClick: () => setIsFormOpen(true), children: [_jsx(Plus, { className: "mr-1 h-4 w-4" }), "New Project"] })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { className: "pl-10", placeholder: "Search projects...", value: searchTerm, onChange: e => setSearchTerm(e.target.value) })] }), _jsx("div", { className: "w-full md:w-64", children: _jsxs(Select, { value: statusFilter || "", onValueChange: value => setStatusFilter(value || null), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), statusFilter ? `Status: ${statusFilter}` : "All Statuses"] }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "", children: "All Statuses" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "planned", children: "Planned" }), _jsx(SelectItem, { value: "on-hold", children: "On Hold" }), _jsx(SelectItem, { value: "completed", children: "Completed" }), _jsx(SelectItem, { value: "cancelled", children: "Cancelled" })] })] }) })] }), isLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "bg-white rounded-lg border shadow-sm animate-pulse h-48" }, i))) })) : (_jsx(_Fragment, { children: filteredProjects.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredProjects.map(project => (_jsx(ProjectCard, { project: project }, project.id))) })) : (_jsxs("div", { className: "text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "No projects found" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: searchTerm || statusFilter
                                        ? "Try adjusting your search or filter to find what you're looking for."
                                        : "Get started by creating a new project." }), _jsxs(Button, { onClick: () => setIsFormOpen(true), className: "mt-4", children: [_jsx(Plus, { className: "mr-1 h-4 w-4" }), "Create Project"] })] })) }))] }), _jsx(ProjectForm, { isOpen: isFormOpen, onOpenChange: setIsFormOpen, onSubmit: handleCreateProject })] }));
};
export default ProjectsPage;
