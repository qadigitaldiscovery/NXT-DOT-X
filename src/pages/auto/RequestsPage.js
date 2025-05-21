import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { FileInput, Plus, ClipboardList, Clock, Settings } from 'lucide-react';
const RequestsPage = () => {
    const requestsNavCategories = [
        {
            name: "Requests",
            label: "Submit Requests",
            items: [
                { label: "Dashboard", path: "/requests", icon: FileInput },
                { label: "New Request", path: "/requests/new", icon: Plus },
                { label: "My Requests", path: "/requests/my-requests", icon: ClipboardList },
                { label: "Pending Requests", path: "/requests/pending", icon: Clock },
                { label: "Settings", path: "/requests/settings", icon: Settings }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "Submit Requests", moduleDescription: "Create and manage service requests, feature requests, and support tickets.", navCategories: requestsNavCategories, docsLink: "/admin/documentation?section=requests" }));
};
export default RequestsPage;
