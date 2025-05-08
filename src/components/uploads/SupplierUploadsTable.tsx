
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
import { 
  SupplierUpload, 
  useDeleteSupplierUpload, 
  useProcessSupplierUpload, 
  useSupplierUploads,
  useAssignUploadToSupplier
} from '@/hooks/use-supplier-uploads';
import { Supplier, useSuppliers } from '@/hooks/use-suppliers';
import { UploadsTableRow } from './UploadsTableRow';
import { AssignUploadDialog } from './AssignUploadDialog';

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
  
  const title = isHoldingBucket 
    ? "Holding Bucket (Unallocated Files)" 
    : (supplier ? `${supplier.name} - Uploaded Files` : 'Recent Uploads');
  
  const description = isHoldingBucket
    ? "Files uploaded without a specific supplier that need to be allocated" 
    : (supplier ? `Files uploaded for ${supplier.name}` : 'Recently uploaded supplier cost files');
  
  const showSupplierColumn = !supplier && !isHoldingBucket;
  
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
                  {showSupplierColumn && <TableHead>Supplier</TableHead>}
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
                    <TableCell colSpan={showSupplierColumn ? 8 : 7} className="h-24 text-center">
                      Loading uploads...
                    </TableCell>
                  </TableRow>
                ) : uploads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showSupplierColumn ? 8 : 7} className="h-24 text-center text-muted-foreground">
                      {isHoldingBucket 
                        ? 'No files in holding bucket' 
                        : 'No file uploads found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  uploads.map((upload) => (
                    <UploadsTableRow
                      key={upload.id}
                      upload={upload}
                      showSupplierColumn={showSupplierColumn}
                      isHoldingBucket={isHoldingBucket}
                      onProcess={handleProcess}
                      onDelete={handleDelete}
                      onAssign={handleOpenAssignDialog}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <AssignUploadDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        selectedUpload={selectedUpload}
        suppliers={suppliers}
        selectedSupplierId={selectedSupplierId}
        onSupplierChange={setSelectedSupplierId}
        onAssign={handleAssignToSupplier}
      />
    </>
  );
}
