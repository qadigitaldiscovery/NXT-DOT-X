
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, DownloadCloud, User, Trash2 } from "lucide-react";
import { SupplierUpload } from '@/types/supplier-uploads';

interface UploadActionsMenuProps {
  upload: SupplierUpload;
  isHoldingBucket: boolean;
  onProcess: (upload: SupplierUpload) => void;
  onDelete: (upload: SupplierUpload) => void;
  onAssign: (upload: SupplierUpload) => void;
}

export function UploadActionsMenu({
  upload,
  isHoldingBucket,
  onProcess,
  onDelete,
  onAssign
}: UploadActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {upload.status === 'pending' && (
          <DropdownMenuItem onClick={() => onProcess(upload)}>
            <Play className="h-4 w-4 mr-2" />
            Process File
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <DownloadCloud className="h-4 w-4 mr-2" />
          Download
        </DropdownMenuItem>
        
        {isHoldingBucket && (
          <DropdownMenuItem onClick={() => onAssign(upload)}>
            <User className="h-4 w-4 mr-2" />
            Assign to Supplier
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onDelete(upload)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
