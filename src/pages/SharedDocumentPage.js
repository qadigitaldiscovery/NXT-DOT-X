import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentViewer } from "@/components/admin/documentation/DocumentViewer";
import { documentService } from "@/components/admin/documentation/documentService";
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SharedDocumentPage = () => {
    const { shareId } = useParams();
    const [document, setDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loadDocument = async () => {
            if (!shareId) {
                setError("No share ID provided");
                setIsLoading(false);
                return;
            }
            try {
                const doc = await documentService.getDocumentByShareId(shareId);
                if (doc) {
                    setDocument(doc);
                }
                else {
                    setError("Document not found or is no longer shared");
                }
            }
            catch (err) {
                console.error("Error loading shared document:", err);
                setError("Failed to load document");
            }
            finally {
                setIsLoading(false);
            }
        };
        loadDocument();
    }, [shareId]);
    if (isLoading) {
        return (_jsx("div", { className: "container mx-auto px-4 py-12 flex justify-center", children: _jsx("div", { className: "w-full max-w-4xl", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 dark:bg-gray-700 rounded-t-lg mb-4" }), _jsx("div", { className: "p-6", children: _jsx("div", { className: "h-64 bg-gray-200 dark:bg-gray-700 rounded" }) })] }) }) }));
    }
    if (error || !document) {
        return (_jsx("div", { className: "container mx-auto px-4 py-12 flex justify-center", children: _jsx("div", { className: "w-full max-w-4xl", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center", children: [_jsx(AlertTriangle, { className: "h-12 w-12 mx-auto text-amber-500 mb-3" }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "Document Not Available" }), _jsx("p", { className: "text-gray-500 mb-4", children: error || "This document is not available or may have been removed." }), _jsxs(Button, { onClick: () => navigate('/'), className: "flex items-center", children: [_jsx(Home, { size: 16, className: "mr-2" }), "Go Home"] })] }) }) }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsx("div", { className: "mb-4", children: _jsxs(Button, { variant: "outline", size: "sm", className: "flex items-center", onClick: () => navigate('/'), children: [_jsx(ArrowLeft, { size: 16, className: "mr-2" }), "Back to Home"] }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow", children: _jsx(DocumentViewer, { document: document }) }), _jsx("div", { className: "mt-4 text-center text-sm text-gray-500", children: _jsx("p", { children: "This is a shared document from the NXT-DOT-X Documentation System" }) })] }));
};
export default SharedDocumentPage;
