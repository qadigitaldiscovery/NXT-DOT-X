// This file re-exports all the refactored hooks for supplier uploads
// for backward compatibility
import { useSupplierUploads } from './uploads/use-fetch-uploads';
import { useCreateSupplierUpload } from './uploads/use-create-upload';
import { useDeleteSupplierUpload } from './uploads/use-delete-upload';
import { useProcessSupplierUpload } from './uploads/use-process-upload';
import { useAssignUploadToSupplier } from './uploads/use-assign-upload';
export { useSupplierUploads, useCreateSupplierUpload, useDeleteSupplierUpload, useProcessSupplierUpload, useAssignUploadToSupplier };
