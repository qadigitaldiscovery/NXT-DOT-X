import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from '@/components/ui/card';
import { Folder } from 'lucide-react';
import { DocumentSearchBar } from './DocumentSearchBar';
import { DocumentToolbar } from './DocumentToolbar';
export function DocumentExplorer({ documents, onItemClick, onSearch }) {
    const handleDocumentAdd = () => {
        console.log('Add document');
    };
    const handleCategoryAdd = () => {
        console.log('Add category');
    };
    const handleFileUpload = () => {
        console.log('Upload file');
    };
    const handleRefresh = () => {
        console.log('Refresh');
    };
    // Explicitly type categories as DocumentCategory[]
    const categories = [];
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(DocumentSearchBar, { onSearch: onSearch }), _jsx(DocumentToolbar, { categories: categories, onDocumentAdd: handleDocumentAdd, onCategoryAdd: handleCategoryAdd, onFileUpload: handleFileUpload, onRefresh: handleRefresh }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: documents.map((doc) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => onItemClick(doc.id, doc.type), children: _jsxs(CardContent, { className: "p-4 flex flex-col items-center justify-center", children: [_jsx(Folder, { className: "h-12 w-12 text-muted-foreground/50 mb-2" }), _jsx("div", { className: "text-sm font-medium text-center truncate w-full", children: doc.name }), _jsx("div", { className: "text-xs text-muted-foreground text-center", children: doc.type === 'file' ? `Updated: ${doc.updatedAt}` : 'Folder' })] }) }, doc.id))) })] }));
}
