import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { Files, Upload, Search, History, Settings } from 'lucide-react';
const FilesPage = () => {
    const filesNavCategories = [
        {
            name: "Files",
            label: "Files",
            items: [
                { label: "Dashboard", path: "/files", icon: Files },
                { label: "Upload", path: "/files/upload", icon: Upload },
                { label: "Search", path: "/files/search", icon: Search },
                { label: "History", path: "/files/history", icon: History },
                { label: "Settings", path: "/files/settings", icon: Settings }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "Files", moduleDescription: "Manage file storage, uploads, downloads, and permissions across the platform.", navCategories: filesNavCategories, docsLink: "/admin/documentation?section=files" }));
};
export default FilesPage;
