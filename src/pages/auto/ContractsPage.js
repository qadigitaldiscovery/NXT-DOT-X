import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { FileText, ClipboardCheck, Calendar, AlertCircle, Plus } from 'lucide-react';
const ContractsPage = () => {
    const contractsNavCategories = [
        {
            name: "Contracts",
            label: "Contracts",
            items: [
                { label: "Dashboard", path: "/contracts", icon: FileText },
                { label: "All Contracts", path: "/contracts/list", icon: ClipboardCheck },
                { label: "Create Contract", path: "/contracts/new", icon: Plus },
                { label: "Calendar View", path: "/contracts/calendar", icon: Calendar },
                { label: "Expiring Soon", path: "/contracts/expiring", icon: AlertCircle }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "Contracts", moduleDescription: "Manage contracts, terms, renewals, and compliance documentation.", navCategories: contractsNavCategories, docsLink: "/admin/documentation?section=contracts" }));
};
export default ContractsPage;
