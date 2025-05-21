import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { Building, Users, FileText, Map, Settings, ListOrdered } from 'lucide-react';
const EntitiesPage = () => {
    const entitiesNavCategories = [
        {
            name: "Entities",
            label: "Entities",
            items: [
                { label: "Dashboard", path: "/entities", icon: Building },
                { label: "Directory", path: "/entities/list", icon: ListOrdered },
                { label: "Personnel", path: "/entities/personnel", icon: Users },
                { label: "Documents", path: "/entities/documents", icon: FileText },
                { label: "Locations", path: "/entities/locations", icon: Map },
                { label: "Settings", path: "/entities/settings", icon: Settings }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "Entities", moduleDescription: "Manage organizational entities, their structure, personnel, and related information.", navCategories: entitiesNavCategories, docsLink: "/admin/documentation?section=entities" }));
};
export default EntitiesPage;
