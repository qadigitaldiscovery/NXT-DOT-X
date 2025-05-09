
// This file re-exports all the refactored hooks for backward compatibility
import { 
  Supplier,
  useSuppliers,
  useSupplier,
  useCreateSupplier,
  useCreateBulkSuppliers,
  useUpdateSupplier,
  useDeleteSupplier
} from './suppliers';

export type { Supplier };

export {
  useSuppliers,
  useSupplier,
  useCreateSupplier,
  useCreateBulkSuppliers,
  useUpdateSupplier,
  useDeleteSupplier
};
