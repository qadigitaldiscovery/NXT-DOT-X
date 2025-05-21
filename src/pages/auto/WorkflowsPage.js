import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { GitCompareArrows, List, Plus, History, Settings } from 'lucide-react';
const WorkflowsPage = () => {
    const workflowsNavCategories = [
        {
            name: "Workflows",
            label: "Workflows",
            items: [
                { label: "Dashboard", path: "/workflows", icon: GitCompareArrows },
                { label: "All Workflows", path: "/workflows/list", icon: List },
                { label: "Create Workflow", path: "/workflows/new", icon: Plus },
                { label: "History", path: "/workflows/history", icon: History },
                { label: "Settings", path: "/workflows/settings", icon: Settings }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "Workflows", moduleDescription: "Design, manage, and monitor business process workflows across the platform.", navCategories: workflowsNavCategories, docsLink: "/admin/documentation?section=workflows" }));
};
export default WorkflowsPage;
