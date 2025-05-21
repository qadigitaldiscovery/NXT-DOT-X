import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsTable } from '@/components/uploads/DocumentsTable';
import { DocumentUploadForm } from '@/components/uploads/DocumentUploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tag, FilePlus2, FileArchive, Upload, Download, Share2, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
// Sample suppliers for the dropdown
const suppliers = [
    { id: '1', name: 'AudioTech Pro' },
    { id: '2', name: 'VisualEdge' },
    { id: '3', name: 'SoundVision' },
    { id: '4', name: 'MediaMax' }
];
export default function DocumentsPage() {
    const [activeTab, setActiveTab] = useState('all-documents');
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedSupplier, setSelectedSupplier] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [shareEmail, setShareEmail] = useState('');
    // Simulate loading data
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // If we wanted to simulate an error: throw new Error('Failed to load documents');
            }
            catch (err) {
                console.error('Error loading documents:', err);
                setError('Failed to load documents. Please try again later.');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [refreshKey]);
    const handleUploadComplete = () => {
        setActiveTab('all-documents');
        setRefreshKey(prev => prev + 1);
        toast.success('Document uploaded successfully!');
    };
    // Get the selected supplier object
    const selectedSupplierObj = selectedSupplier
        ? suppliers.find(s => s.id === selectedSupplier)
        : undefined;
    // Handle download action
    const handleDownload = () => {
        try {
            toast.success('Downloading documents...');
            // In a real application, this would trigger a download
        }
        catch (err) {
            toast.error('Failed to download documents. Please try again.');
            console.error('Error downloading:', err);
        }
    };
    // Handle share action
    const handleShare = (document) => {
        try {
            setSelectedDocument(document);
            setShareEmail('');
            setShowShareDialog(true);
        }
        catch (err) {
            toast.error('Error preparing to share document. Please try again.');
            console.error('Error sharing:', err);
        }
    };
    // Handle delete action
    const handleDelete = (document) => {
        try {
            setSelectedDocument(document);
            setShowDeleteDialog(true);
        }
        catch (err) {
            toast.error('Error preparing to delete document. Please try again.');
            console.error('Error deleting:', err);
        }
    };
    // Confirm share
    const confirmShare = () => {
        try {
            if (!shareEmail) {
                toast.error('Please enter an email address');
                return;
            }
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(shareEmail)) {
                toast.error('Please enter a valid email address');
                return;
            }
            toast.success(`Document shared with ${shareEmail}`);
            setShowShareDialog(false);
        }
        catch (err) {
            toast.error('Error sharing document. Please try again.');
            console.error('Error in share confirmation:', err);
        }
    };
    // Confirm delete
    const confirmDelete = () => {
        try {
            toast.success('Document deleted successfully');
            setShowDeleteDialog(false);
            setRefreshKey(prev => prev + 1); // Refresh the list
        }
        catch (err) {
            toast.error('Error deleting document. Please try again.');
            console.error('Error in delete confirmation:', err);
        }
    };
    // Loading state
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Document Repository" }), _jsx("p", { className: "text-muted-foreground", children: "Manage supplier contracts, specifications and other documents" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", onClick: handleDownload, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Download"] }), _jsxs(Button, { variant: "outline", onClick: () => handleShare({ name: 'Selected Documents' }), children: [_jsx(Share2, { className: "h-4 w-4 mr-2" }), "Share"] }), _jsxs(Button, { variant: "outline", onClick: () => handleDelete({ name: 'Selected Documents' }), children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete"] }), _jsxs(Button, { onClick: () => setActiveTab('upload-document'), children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Upload"] })] })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mb-6", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Documents" }), _jsx(FileArchive, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: "42" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "7 documents added this month" })] })] }), _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Documents by Type" }), _jsx(Tag, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: "6 Types" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Contracts, price lists, specifications..." })] })] }), _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Expiring Soon" }), _jsx(FilePlus2, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: "3" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Documents expiring in the next 30 days" })] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "all-documents", children: "All Documents" }), _jsx(TabsTrigger, { value: "by-supplier", children: "By Supplier" }), _jsx(TabsTrigger, { value: "upload-document", children: "Upload New Document" })] }), _jsx(TabsContent, { value: "all-documents", className: "pt-4", children: _jsx(DocumentsTable, { onShare: handleShare, onDelete: handleDelete }, `documents-all-${refreshKey}`) }), _jsx(TabsContent, { value: "by-supplier", className: "pt-4", children: _jsxs("div", { className: "grid gap-6", children: [_jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Filter by Supplier" }), _jsx(CardDescription, { children: "View documents for a specific supplier" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "max-w-sm", children: [_jsx(Label, { htmlFor: "supplier-select", children: "Select Supplier" }), _jsxs(Select, { value: selectedSupplier, onValueChange: setSelectedSupplier, children: [_jsx(SelectTrigger, { id: "supplier-select", children: _jsx(SelectValue, { placeholder: "Choose a supplier" }) }), _jsx(SelectContent, { children: suppliers.map(supplier => (_jsx(SelectItem, { value: supplier.id, children: supplier.name }, supplier.id))) })] })] }) })] }), selectedSupplierObj && (_jsx(DocumentsTable, { supplier: selectedSupplierObj, onShare: handleShare, onDelete: handleDelete }, `documents-supplier-${selectedSupplier}-${refreshKey}`))] }) }), _jsx(TabsContent, { value: "upload-document", className: "pt-4", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsx(DocumentUploadForm, { onUploadComplete: handleUploadComplete }) }) })] }), _jsx(Dialog, { open: showShareDialog, onOpenChange: setShowShareDialog, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Share Document" }), _jsx(DialogDescription, { children: selectedDocument ? `Share "${selectedDocument.name}" with others.` : 'Share documents with others.' })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Recipient Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "colleague@example.com", value: shareEmail, onChange: (e) => setShareEmail(e.target.value) })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "message", children: "Message (Optional)" }), _jsx(Input, { id: "message", placeholder: "Here are the documents you requested..." })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowShareDialog(false), children: "Cancel" }), _jsx(Button, { onClick: confirmShare, children: "Share" })] })] }) }), _jsx(Dialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Confirm Deletion" }), _jsxs(DialogDescription, { children: [selectedDocument
                                            ? `Are you sure you want to delete "${selectedDocument.name}"?`
                                            : 'Are you sure you want to delete the selected documents?', " This action cannot be undone."] })] }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { variant: "destructive", onClick: confirmDelete, children: "Delete" })] })] }) })] }));
}
