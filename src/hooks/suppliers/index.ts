
// Re-export all supplier hooks for easy importing
import { Supplier } from './types';
import { useSuppliers, useSupplier } from './use-fetch-suppliers';
import { useCreateSupplier } from './use-create-supplier';
import { useCreateBulkSuppliers } from './use-bulk-create-suppliers';
import { useUpdateSupplier } from './use-update-supplier';
import { useDeleteSupplier } from './use-delete-supplier';

export type { Supplier };

export {
  useSuppliers,
  useSupplier,
  useCreateSupplier,
  useCreateBulkSuppliers,
  useUpdateSupplier,
  useDeleteSupplier
};
