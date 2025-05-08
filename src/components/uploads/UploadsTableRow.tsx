
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { SupplierUpload } from '@/types/supplier-uploads';
import { FileTypeIcon } from './FileTypeIcon';
import { StatusBadge } from './StatusBadge';
import { ErrorBadge } from './ErrorBadge';
import { FileSize } from './FileSize';
import { UploadActionsMenu } from './UploadActionsMenu';

interface UploadsTableRowProps {
  upload: SupplierUpload;
  showSupplierColumn: boolean;
  isHoldingBucket: boolean;
  onProcess: (upload: SupplierUpload) => void;
  onDelete: (upload: SupplierUpload) => void;
  onAssign: (upload: SupplierUpload) => void;
}

export function UploadsTableRow({
  upload,
  showSupplierColumn,
  isHoldingBucket,
  onProcess,
  onDelete,
  onAssign
}: UploadsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <FileTypeIcon fileName={upload.file_name} fileType={upload.file_type} />
      </TableCell>
      
      {showSupplierColumn && (
        <TableCell>{upload.supplier_name}</TableCell>
      )}
      
      <TableCell>
        {format(new Date(upload.created_at), 'PP')}
      </TableCell>
      
      <TableCell>
        <FileSize bytes={upload.file_size} />
      </TableCell>
      
      <TableCell>
        <StatusBadge status={upload.status} />
      </TableCell>
      
      <TableCell>{upload.processed_rows || '—'}</TableCell>
      
      <TableCell>
        <ErrorBadge errorRows={upload.error_rows} status={upload.status} />
      </TableCell>
      
      <TableCell>
        <UploadActionsMenu
          upload={upload}
          isHoldingBucket={isHoldingBucket}
          onProcess={onProcess}
          onDelete={onDelete}
          onAssign={onAssign}
        />
      </TableCell>
    </TableRow>
  );
}
