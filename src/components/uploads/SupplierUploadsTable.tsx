
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { File, MoreHorizontal, DownloadCloud, Play, Trash2, AlertCircle, CheckCircle, Clock, User } from "lucide-react";
import { 
  SupplierUpload, 
  useDeleteSupplierUpload, 
  useProcessSupplierUpload, 
  useSupplierUploads,
  useAssignUploadToSupplier
} from '@/hooks/use-supplier-uploads';
import { Supplier, useSuppliers } from '@/hooks/use-suppliers';

type SupplierUploadsTableProps = {
  supplier?: Supplier;
  supplierId?: string;
};

export function SupplierUploadsTable({ supplier, supplierId }: SupplierUploadsTableProps) {
  const [selectedUpload, setSelectedUpload] = useState<SupplierUpload | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  
  const isHoldingBucket = supplierId === 'holding';
  const actualSupplierId = isHoldingBucket ? undefined : (supplier?.id || supplierId);
  
  const { data: uploads = [], isLoading } = useSupplierUploads(
    actualSupplierId,
    isHoldingBucket
  );
  
  const { data: suppliers = [] } = useSuppliers();
  const { mutate: processUpload } = useProcessSupplierUpload();
  const { mutate: deleteUpload } = useDeleteSupplierUpload();
  const { mutate: assignToSupplier } = useAssignUploadToSupplier();
  
  const handleDelete = (upload: SupplierUpload) => {
    if (window.confirm(`Are you sure you want to delete the file "${upload.file_name}"?`)) {
      deleteUpload(upload);
    }
  };
  
  const handleProcess = (upload: SupplierUpload) => {
    processUpload(upload);
  };
  
  const handleOpenAssignDialog = (upload: SupplierUpload) => {
    setSelectedUpload(upload);
    setSelectedSupplierId("");
    setAssignDialogOpen(true);
  };
  
  const handleAssignToSupplier = () => {
    if (selectedUpload && selectedSupplierId) {
      assignToSupplier({
        uploadId: selectedUpload.id,
        supplierId: selectedSupplierId
      }, {
        onSuccess: () => {
          setAssignDialogOpen(false);
          setSelectedUpload(null);
          setSelectedSupplierId("");
        }
      });
    }
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('csv')) return 'CSV';
    if (fileType.includes('excel') || fileType.includes('xlsx') || fileType.includes('xls')) return 'XLS';
    if (fileType.includes('pdf')) return 'PDF';
    return 'FILE';
  };
  
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          Pending
        </Badge>;
      case 'processing':
        return <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
          <Play className="h-3.5 w-3.5" />
          Processing
        </Badge>;
      case 'completed':
        return <Badge variant="default" className="flex items-center gap-1 bg-green-600">
          <CheckCircle className="h-3.5 w-3.5" />
          Completed
        </Badge>;
      case 'failed':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Failed
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const title = isHoldingBucket 
    ? "Holding Bucket (Unallocated Files)" 
    : (supplier ? `${supplier.name} - Uploaded Files` : 'Recent Uploads');
  
  const description = isHoldingBucket
    ? "Files uploaded without a specific supplier that need to be allocated" 
    : (supplier ? `Files uploaded for ${supplier.name}` : 'Recently uploaded supplier cost files');
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  {!supplier && !isHoldingBucket && <TableHead>Supplier</TableHead>}
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Processed Rows</TableHead>
                  <TableHead>Errors</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={isHoldingBucket || supplier ? 7 : 8} className="h-24 text-center">
                      Loading uploads...
                    </TableCell>
                  </TableRow>
                ) : uploads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isHoldingBucket || supplier ? 7 : 8} className="h-24 text-center text-muted-foreground">
                      {isHoldingBucket 
                        ? 'No files in holding bucket' 
                        : 'No file uploads found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-muted rounded p-1.5">
                            <File className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{upload.file_name}</span>
                          <Badge variant="outline" className="ml-1">{getFileIcon(upload.file_type)}</Badge>
                        </div>
                      </TableCell>
                      {!supplier && !isHoldingBucket && (
                        <TableCell>{upload.supplier_name}</TableCell>
                      )}
                      <TableCell>
                        {format(new Date(upload.created_at), 'PP')}
                      </TableCell>
                      <TableCell>{formatFileSize(upload.file_size)}</TableCell>
                      <TableCell>{getStatusBadge(upload.status)}</TableCell>
                      <TableCell>{upload.processed_rows || '—'}</TableCell>
                      <TableCell>
                        {upload.error_rows > 0 ? (
                          <Badge variant="outline" className="bg-red-50 text-red-800">
                            {upload.error_rows} errors
                          </Badge>
                        ) : upload.status === 'completed' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-800">
                            No errors
                          </Badge>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {upload.status === 'pending' && (
                              <DropdownMenuItem onClick={() => handleProcess(upload)}>
                                <Play className="h-4 w-4 mr-2" />
                                Process File
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <DownloadCloud className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            
                            {isHoldingBucket && (
                              <DropdownMenuItem onClick={() => handleOpenAssignDialog(upload)}>
                                <User className="h-4 w-4 mr-2" />
                                Assign to Supplier
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(upload)}
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
      
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign File to Supplier</DialogTitle>
            <DialogDescription>
              Select a supplier to assign this file to.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUpload && (
            <div className="py-4">
              <div className="mb-4 p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <File className="h-4 w-4" />
                  <span className="font-medium">{selectedUpload.file_name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Uploaded: {format(new Date(selectedUpload.created_at), 'PPpp')}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Supplier</label>
                <Select value={selectedSupplierId} onValueChange={setSelectedSupplierId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAssignToSupplier} 
              disabled={!selectedSupplierId}
            >
              Assign to Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
