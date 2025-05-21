import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { format } from 'date-fns';
import { DownloadCloud, Edit, Trash2, MoreHorizontal, Search, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
// Sample document data
const sampleDocuments = [
    {
        id: '1',
        name: 'AudioTech Pro Contract 2025',
        documentType: 'contract',
        supplier: 'AudioTech Pro',
        fileType: 'pdf',
        uploadDate: new Date(2025, 4, 2),
        expiryDate: new Date(2026, 4, 2),
        fileSize: 2.4 * 1024 * 1024, // 2.4 MB
        status: 'active'
    },
    {
        id: '2',
        name: 'VisualEdge Price List Q2 2025',
        documentType: 'price_list',
        supplier: 'VisualEdge',
        fileType: 'xlsx',
        uploadDate: new Date(2025, 3, 15),
        expiryDate: new Date(2025, 6, 15),
        fileSize: 1.2 * 1024 * 1024, // 1.2 MB
        status: 'active'
    },
    {
        id: '3',
        name: 'SoundVision Product Specifications',
        documentType: 'specification',
        supplier: 'SoundVision',
        fileType: 'docx',
        uploadDate: new Date(2025, 2, 28),
        expiryDate: null,
        fileSize: 3.7 * 1024 * 1024, // 3.7 MB
        status: 'active'
    },
    {
        id: '4',
        name: 'MediaMax Quality Certification',
        documentType: 'certification',
        supplier: 'MediaMax',
        fileType: 'pdf',
        uploadDate: new Date(2025, 1, 10),
        expiryDate: new Date(2025, 5, 10),
        fileSize: 1.8 * 1024 * 1024, // 1.8 MB
        status: 'expiring'
    },
    {
        id: '5',
        name: 'AudioTech Pro Invoice #INV-20250325',
        documentType: 'invoice',
        supplier: 'AudioTech Pro',
        fileType: 'pdf',
        uploadDate: new Date(2025, 2, 25),
        expiryDate: null,
        fileSize: 0.9 * 1024 * 1024, // 0.9 MB
        status: 'active'
    },
    {
        id: '6',
        name: 'VisualEdge Return Policy',
        documentType: 'other',
        supplier: 'VisualEdge',
        fileType: 'pdf',
        uploadDate: new Date(2025, 0, 5),
        expiryDate: null,
        fileSize: 0.5 * 1024 * 1024, // 0.5 MB
        status: 'active'
    },
    {
        id: '7',
        name: 'SoundVision Contract 2024',
        documentType: 'contract',
        supplier: 'SoundVision',
        fileType: 'pdf',
        uploadDate: new Date(2024, 4, 10),
        expiryDate: new Date(2025, 4, 10),
        fileSize: 2.1 * 1024 * 1024, // 2.1 MB
        status: 'expired'
    }
];
// Document type labels
const documentTypes = {
    'contract': 'Contract',
    'price_list': 'Price List',
    'specification': 'Specification',
    'certification': 'Certification',
    'invoice': 'Invoice',
    'other': 'Other'
};
export function DocumentsTable({ supplier, onShare, onDelete }) {
    const [documents, setDocuments] = useState(supplier
        ? sampleDocuments.filter(doc => doc.supplier === supplier.name)
        : sampleDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            setDocuments(documents.filter(doc => doc.id !== id));
            toast.success('Document deleted successfully');
            // Call the onDelete prop if provided
            if (onDelete) {
                const documentToDelete = documents.find(doc => doc.id === id);
                if (documentToDelete) {
                    onDelete(documentToDelete);
                }
            }
        }
    };
    const handleDownload = (id, name) => {
        toast.success(`Downloading "${name}"...`);
        // In a real application, this would trigger a download
    };
    const handleShare = (document) => {
        if (onShare) {
            onShare(document);
        }
    };
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = searchTerm === '' ||
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || doc.documentType === filterType;
        const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });
    const formatFileSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(1)} ${units[unitIndex]}`;
    };
    const getFileIcon = (fileType) => {
        if (fileType === 'pdf')
            return 'PDF';
        if (fileType === 'docx' || fileType === 'doc')
            return 'DOC';
        if (fileType === 'xlsx' || fileType === 'xls')
            return 'XLS';
        return 'FILE';
    };
    const getStatusBadge = (status, expiryDate) => {
        if (status === 'active') {
            // If expiry date is within 30 days, show "expiring soon"
            if (expiryDate && (expiryDate.getTime() - new Date().getTime()) < 30 * 24 * 60 * 60 * 1000) {
                return (_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300", children: [_jsx(AlertTriangle, { className: "h-3.5 w-3.5" }), "Expiring Soon"] }));
            }
            return (_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 bg-green-100 text-green-800 border-green-300", children: [_jsx(CheckCircle2, { className: "h-3.5 w-3.5" }), "Active"] }));
        }
        else if (status === 'expired') {
            return (_jsxs(Badge, { variant: "destructive", className: "flex items-center gap-1", children: [_jsx(AlertTriangle, { className: "h-3.5 w-3.5" }), "Expired"] }));
        }
        else if (status === 'expiring') {
            return (_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300", children: [_jsx(AlertTriangle, { className: "h-3.5 w-3.5" }), "Expiring Soon"] }));
        }
        return _jsx(Badge, { children: status });
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { children: supplier ? `${supplier.name} - Documents` : 'Document Repository' }), _jsx(CardDescription, { children: supplier
                            ? `View and manage documents for ${supplier.name}`
                            : 'All uploaded supplier documents and contracts' }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { type: "search", placeholder: "Search documents...", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs("div", { className: "flex flex-row gap-2", children: [_jsxs(Select, { value: filterType, onValueChange: setFilterType, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Document Type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Types" }), Object.entries(documentTypes).map(([value, label]) => (_jsx(SelectItem, { value: value, children: label }, value)))] })] }), _jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [_jsx(SelectTrigger, { className: "w-[150px]", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Statuses" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "expiring", children: "Expiring Soon" }), _jsx(SelectItem, { value: "expired", children: "Expired" })] })] })] })] })] }), _jsx(CardContent, { children: _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Document" }), !supplier && _jsx(TableHead, { children: "Supplier" }), _jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Upload Date" }), _jsx(TableHead, { children: "Expiry" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Size" }), _jsx(TableHead, { className: "w-[80px]", children: "Actions" })] }) }), _jsx(TableBody, { children: filteredDocuments.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: supplier ? 7 : 8, className: "h-24 text-center text-muted-foreground", children: "No documents found" }) })) : (filteredDocuments.map((doc) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-muted rounded p-1.5", children: _jsx(FileText, { className: "h-4 w-4" }) }), _jsx("span", { className: "font-medium", children: doc.name }), _jsx(Badge, { variant: "outline", className: "ml-1", children: getFileIcon(doc.fileType) })] }) }), !supplier && _jsx(TableCell, { children: doc.supplier }), _jsx(TableCell, { children: documentTypes[doc.documentType] }), _jsx(TableCell, { children: format(doc.uploadDate, 'dd MMM yyyy') }), _jsx(TableCell, { children: doc.expiryDate ? format(doc.expiryDate, 'dd MMM yyyy') : '—' }), _jsx(TableCell, { children: getStatusBadge(doc.status, doc.expiryDate) }), _jsx(TableCell, { children: formatFileSize(doc.fileSize) }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Actions" }), _jsxs(DropdownMenuItem, { onClick: () => handleDownload(doc.id, doc.name), children: [_jsx(DownloadCloud, { className: "h-4 w-4 mr-2" }), "Download"] }), onShare && (_jsxs(DropdownMenuItem, { onClick: () => handleShare(doc), children: [_jsx(FileText, { className: "h-4 w-4 mr-2" }), "Share"] })), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "h-4 w-4 mr-2" }), "Edit Details"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-red-600", onClick: () => handleDelete(doc.id), children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete"] })] })] }) })] }, doc.id)))) })] }) }) })] }));
}
