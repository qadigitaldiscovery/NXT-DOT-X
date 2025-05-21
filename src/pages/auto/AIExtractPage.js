import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { FileCode, Upload, FileSearch, Settings, Database } from 'lucide-react';
const AIExtractPage = () => {
    const aiExtractNavCategories = [
        {
            name: "AI Extract",
            label: "AI Extract",
            items: [
                { label: "Dashboard", path: "/ai-extract", icon: FileCode },
                { label: "Upload Documents", path: "/ai-extract/upload", icon: Upload },
                { label: "View Extractions", path: "/ai-extract/extractions", icon: FileSearch },
                { label: "Data Storage", path: "/ai-extract/storage", icon: Database },
                { label: "Settings", path: "/ai-extract/settings", icon: Settings }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "AI Extract", moduleDescription: "Extract structured data from documents using AI-powered document processing.", navCategories: aiExtractNavCategories, docsLink: "/admin/documentation?section=ai-extract" }));
};
export default AIExtractPage;
