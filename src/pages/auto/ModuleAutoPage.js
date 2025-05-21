import { jsx as _jsx } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
import MissingPageTemplate from './MissingPageTemplate';
import { Settings, Home, FileText, Users, Database, BarChart3 } from 'lucide-react';
const ModuleAutoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    // Extract module name from path
    const pathParts = path.split('/').filter(part => part !== '');
    const moduleName = pathParts[0] ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1).replace(/-/g, ' ') : 'Module';
    // Create dynamic navigation categories based on the current path
    const navCategories = [
        {
            name: moduleName,
            label: moduleName,
            items: [
                { label: "Dashboard", path: `/${pathParts[0]}`, icon: Home },
                { label: "Settings", path: `/${pathParts[0]}/settings`, icon: Settings },
                { label: "Documentation", path: `/${pathParts[0]}/docs`, icon: FileText },
                { label: "Users", path: `/${pathParts[0]}/users`, icon: Users },
                { label: "Data", path: `/${pathParts[0]}/data`, icon: Database },
                { label: "Analytics", path: `/${pathParts[0]}/analytics`, icon: BarChart3 }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: moduleName, moduleDescription: `This is an auto-generated page for the ${moduleName} module. It provides access to all ${moduleName.toLowerCase()} functionality.`, navCategories: navCategories, docsLink: "/admin/documentation" }));
};
export default ModuleAutoPage;
