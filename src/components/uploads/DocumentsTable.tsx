import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { format } from 'date-fns';
import { File, DownloadCloud, Edit, Trash2, MoreHorizontal, Search, FileText, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
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
const documentTypes: Record<string, string> = {
  'contract': 'Contract',
  'price_list': 'Price List',
  'specification': 'Specification',
  'certification': 'Certification',
  'invoice': 'Invoice',
  'other': 'Other'
};

interface DocumentsTableProps {
  supplier?: { id: string; name: string };
}

export function DocumentsTable({ supplier }: DocumentsTableProps) {
  const [documents, setDocuments] = useState(
    supplier
      ? sampleDocuments.filter(doc => doc.supplier === supplier.name)
      : sampleDocuments
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
      toast.success('Document deleted successfully');
    }
  };
  
  const handleDownload = (id: string, name: string) => {
    toast.success(`Downloading "${name}"...`);
    // In a real application, this would trigger a download
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType === 'pdf') return 'PDF';
    if (fileType === 'docx' || fileType === 'doc') return 'DOC';
    if (fileType === 'xlsx' || fileType === 'xls') return 'XLS';
    return 'FILE';
  };
  
  const getStatusBadge = (status: string, expiryDate: Date | null) => {
    if (status === 'active') {
      // If expiry date is within 30 days, show "expiring soon"
      if (expiryDate && (expiryDate.getTime() - new Date().getTime()) < 30 * 24 * 60 * 60 * 1000) {
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300">
            <AlertTriangle className="h-3.5 w-3.5" />
            Expiring Soon
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-green-100 text-green-800 border-green-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Active
        </Badge>
      );
    } else if (status === 'expired') {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3.5 w-3.5" />
          Expired
        </Badge>
      );
    } else if (status === 'expiring') {
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300">
          <AlertTriangle className="h-3.5 w-3.5" />
          Expiring Soon
        </Badge>
      );
    }
    return <Badge>{status}</Badge>;
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>
          {supplier ? `${supplier.name} - Documents` : 'Document Repository'}
        </CardTitle>
        <CardDescription>
          {supplier
            ? `View and manage documents for ${supplier.name}`
            : 'All uploaded supplier documents and contracts'}
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-row gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(documentTypes).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                {!supplier && <TableHead>Supplier</TableHead>}
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={supplier ? 7 : 8} className="h-24 text-center text-muted-foreground">
                    No documents found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-muted rounded p-1.5">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{doc.name}</span>
                        <Badge variant="outline" className="ml-1">{getFileIcon(doc.fileType)}</Badge>
                      </div>
                    </TableCell>
                    {!supplier && <TableCell>{doc.supplier}</TableCell>}
                    <TableCell>{documentTypes[doc.documentType]}</TableCell>
                    <TableCell>
                      {format(doc.uploadDate, 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      {doc.expiryDate ? format(doc.expiryDate, 'dd MMM yyyy') : '—'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(doc.status, doc.expiryDate)}
                    </TableCell>
                    <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleDownload(doc.id, doc.name)}>
                            <DownloadCloud className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
